function mddoc_extract_frontmatter(doc){
	doc=doc.trim();
	lines=doc.split('\n')

	var fm;
	var mdonly;

	if (lines[0].includes('---')){
		var fm_end=1
		for(fm_end=1;fm_end<lines.length;fm_end++){
			if(lines[fm_end].includes('---')) break;

        }
        
		if(fm_end!==lines.length){
			fm = lines.slice(1,fm_end); // 1 to fm_end-1
			mdonly = lines.slice(fm_end+1,lines.length)

			//console.log(fm)
			fm = fm.join('\n')
			mdonly = mdonly.join('\n')
		}
		else{
			fm="";
			md=doc;
		}
	}else{
		fm=""
		mdonly=doc
	}

    //LOAD USING JSYAML
    fm=jsyaml.load(fm)
    
	return [fm,mdonly]
}


function mddoc_get(url){

    var fm,md;

    var p = (resolve,reject)=>{

        fetch(url).then(response=>response.text()).then((doc)=>{
        //console.log(marked(md))

        //get frontmatter
        fmmd=mddoc_extract_frontmatter(doc)
        fm=fmmd[0];
        md=fmmd[1];

        resolve([fm,md]);
       
        });
    }

    return new Promise(p);

}



function mddoc_fill (url,selector){

    //mddoc_get(url).then((x)=>{console.log(x)}); return;

    var p = (resolve,reject)=>{
        
        mddoc_get(url).then((fmmd)=>{

            fm=fmmd[0]
            md=fmmd[1]

            //console.log(fm)
            
	   ////////////////////////////////  LOAD EXTRA SCRIPT IF PASSED IN FRONTMATTER     ///////////////////////////////////////

	    	// ADD externaljs scripts to selector element
		if (typeof(fm)!='undefined' && typeof(fm.externaljs)!='undefined' && Array.isArray(fm.externaljs)){

			for(var src of fm.externaljs){

				//https://stackoverflow.com/questions/14521108/dynamically-load-js-inside-js
				//
				newScript = document.createElement("script");
				newScript.src = src
				
				//we need to append the newScript to the webpage
				u(selector).append(newScript)

			}
		}

            ////////////////////////////////  LOAD EXTRA SCRIPT IF PASSED IN FRONTMATTER     ///////////////////////////////////////

            //if redirect in frontmatter, fetch that and return | RECURSION NON BASE CASE
            if(typeof(fm)!=='undefined' && typeof(fm.redirect_url)!=='undefined') 
            {
                //console.log(fm)
                console.log('mddoc_fill : redirecting to -> ' + fm.redirect_url)
                
                mddoc_fill(fm.redirect_url,selector).then(d=>{return resolve(d)})
            }

            //BASE CASE FOLLOWS BELOW
            
            u(selector).html(marked(md));
            
            //update links to open in a new window
            u(selector+' a').each((e)=>{
                u(e).attr({target:'_blank'})
            })

            ////////////////////////////////   EXTENDED VUE + MARKDOWN     ///////////////////////////////////////
            __links={}
	    __mqtt_links=[]
            u('.mddoc a').each(function(node,i){
                var link_html = u(node).html() // {{ LINKS.WEATHER.TEMP }} @@ 5
                var link_href = u(node).attr('href')
		

                match = link_html.match(/{{(.*)}}\s*@@(\d+)@@/)


                if( match !== null)
                {
		    /////////////// SETUP VUE VARIABLES //////////////////
		    
		    vue_variable = match[1].trim() //  LINKS.WEATHER.TEMP 
		    timeout = parseInt(match[2].trim())*1000 // 5000ms

		    var variablename = vue_variable.split('.')[1] // WEATHER

		    

		    //TEMP is a variable inside the JSON we fetch
		    //resp = await fetch(link_href)
		    __links[variablename] = ''; //initially fill blank
                   
		    /////////////// SETUP VUE VARIABLES //////////////////

		   //if link is MQTT
		   if(link_href.startsWith('mqtt://')){

			   // original href is of the form mqtt://host[:port]/topic[/subtopics]
			   //
			   var mqtt_url = link_href.split('mqtt://')[1] //get host[:port]/topic[/subtopic]
			   
			   var mqtt_host = mqtt_url.split(':')[0]
			   var mqtt_port = '1883'
			   var mqtt_topic = '' //all topic wildcard

			   // check if port is explicitly given in mqtt_url
			   if(mqtt_url.split(':').length > 1) {
				   mqtt_port = mqtt_url.split(':')[1].split('/')[0]

				   // take everything after the index 0 using splice(1)
				   mqtt_topic = mqtt_url.split(':')[1].split('/').splice(1).join('/') 
			   }else{
				   //port is not given explicitly
				   //
				   //

				   // take everything after the index 0 using splice(1)
				   mqtt_topic = mqtt_url.split('/').splice(1).join('/')
			   }

			   if(mqtt_topic=='') mqtt_topic = '#' //if not given explicitly, select all topic using "#" wildcard
			   console.log(`-> mqtt_host: ${mqtt_host} \n-> mqtt_port: ${mqtt_port} \n-> mqtt_topic: ${mqtt_topic}\n\n`);
			   
			   __mqtt_links.push({'host':mqtt_host,'port':mqtt_port,'topic':mqtt_topic,'vue_data_variablename':variablename})
			   
		   }

		   //else if link is HTTP
		   else{
                   
			    console.log('html-> ' + link_html)
			    //console.log('src-> ' + link_href)
			    console.log(match)


			    
			    setInterval(() => {
				fetch(link_href).then(r=>r.json()).then(data=>{window.VUE_MDDOC.LINKS[variablename]=data})
			    }, timeout);
		   }
                }
            })

	   ////////////////////// HANDLE MQTT SUBSCRIPTION //////////////////////
           // wait till mqtt31.js is loaded and check if Paho.MQTT.Client is available
	   function mqtt_sub(){
		   if( typeof(Paho) !== 'undefined' ){
			   //find how many unique mqtt servers are present (server = host[:port]), we need that many clients
			   servers = __mqtt_links.map(x=>`${x.host}:${x.port}`)
			   unique_servers = [... new Set(servers)]
			   //console.log(unique_servers)
			   
			   window.MQTTCLIENTS = {}
			   for (server of unique_servers){
				   var __this_mqttserver_links = __mqtt_links.filter(x=> `${x.host}:${x.port}`== server)

				   var __host = server.split(':')[0]
				   var __port = server.split(':')[1]


				   //console.log(__this_mqttserver_links)
				   //
				   var __client =  new Paho.MQTT.Client(__host, Number(__port), "labEE250");
				   window.MQTTCLIENTS[server] = __client

				   __client.onMessageArrived = (msg)=>console.log(msg)
					
				   //won't connect because of insecure websocket. Need to run server on HTTP or run MQTT on https
				return; //fix later
				   __client.connect({onSuccess:()=>{
					   __this_mqtthost_links.map( x=>{
						   //__client.subscribe(x.topic)
						   console.log(x)
					   })
				   	}
				   })


				   



			   }
		   }else{
			   setTimeout(mqtt_sub,250); //check after 250ms
		   }
	   }
	   mqtt_sub(); //call it once
	   ////////////////////// HANDLE MQTT SUBSCRIPTION //////////////////////

            ////////////////////////////////   EXTENDED VUE + MARKDOWN     ///////////////////////////////////////

            //setup VUE_MDDOC to fill in variables from FRONTMATTER
            window.VUE_MDDOC = new Vue({
                el: '.mddoc',
                data:{
                    FRONTMATTER: fm,
                    LINKS: __links
                }
            })

            resolve(fmmd);
        })
    }

    

    return new Promise(p);

}





