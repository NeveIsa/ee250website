function get_params(){

    //https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
    params = window.location.search.substr(1)
    //var path=window.location.href.split('?')
    //params = path[path.length - 1];
    //console.log(params);
    params = params.split('&')
    var p;

    var payload = {}
    for (p of params)
    {
        //console.log(p);
        x = p.split('=')
        payload[x[0]] = x[1];
    }

    return payload;
}

vueAcks = new Vue({
    el: '#ACKS',
    data:{
        acks:{}
    }
})

vueHeader = new Vue({
    el: '.header',
    data: {
        siteheader: ''
    }
})

vuewTitle = new Vue({
    el: 'title',
    data:{
        sitetitle: ''
    }
})


function configure_site(){
    configfile = window.location.href.split('?')[0].split('/')[0] + '/config.yml';
    
    p = (resolve,reject)=>{
        fetch(configfile).then(r=>r.text()).then((config)=>{
            window.SITECONFIG = config = jsyaml.load(config);
            __acks=config.site.acks
            vueAcks.acks= config.site.acks
            //console.log(__acks)

            vueHeader.siteheader = config.site.header;
            vuewTitle.sitetitle = config.site.title
            resolve(config)
        })
    }

    return new Promise(p);

}


