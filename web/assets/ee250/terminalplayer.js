terminalplayer_set_source = (_src)=>{
    u('asciinema-player').attr({src:_src});

    //load and save the CAST file for searching keywords
    if(typeof(window.ASCIINEMAFILE)=='undefined'){
        fetch(`${_src}`).then(response=>response.text()).then(
            (castfile)=>{
                window.ASCIINEMAFILE=castfile;	
                //console.log(castfile)
            })
    }
}

vueTermplayer = new Vue({
    el: '#termcontrolbutton',
    data: {
       playing: false,
       playbackposition: 0
    },
   methods:{
       toggle: function(event){
           this.playing = !this.playing;
           if(this.playing) TERMPLAYER.play();
           else TERMPLAYER.pause();
       }
   }
})

vueAsciinemaSearch =  new Vue({
    el: '#asciinemasearch',
    data:{
        searchterm: '', 
        results:[]
    },
    methods:{
        search: function(event){
            this.results = asciinema_search(this.searchterm);
            this.results = this.results.length?this.results:['no match']
            //console.log(this.results)
        },
        seek: function(e){
            var position =  u(e.target).html();
            if(!isNaN(position))TERMPLAYER.currentTime = position; 
        }
    }
})

function asciinema_search(word){
    if(word=='') return [];

    re = RegExp(`${word}`,'g')
    lines = ASCIINEMAFILE.split('\n');

    var matchtimes=[]
    for(l of lines){
        l = l.trim();
        if(l=='') continue; //skip
        
        l=JSON.parse(l) // [time,"o","commands and terminal data"]
        
        if(!Array.isArray(l)) continue; //skip if not array

        if(l[2].search(re)!==-1){
            v = parseFloat(l[0]).toFixed(2);
            matchtimes.push(v)
        }
    }

    return matchtimes

}


// GLOBAL RUN
window.TERMPLAYER = u('asciinema-player').nodes[0]


//set clipboard copy text for commenting
var commentbutton = u('#asciinemacomment')
var lab = get_params().folder.replace(' ','').match(/[Ll]ab\d+/g)

commentbutton.attr('data-clipboard-text',`${lab}@0.0: Your Comment Goes Here`)

TERMPLAYER.addEventListener('play', function(e) {
	vueTermplayer.playing=true;
	window.TERM_PLAYPOS_UPDATE = setInterval(()=>{
        vueTermplayer.playbackposition = TERMPLAYER.currentTime;
        var comment_location = Number.parseFloat(TERMPLAYER.currentTime).toFixed(1);
        commentbutton.attr('data-clipboard-text',`${lab}@${comment_location}: Your Comment Goes Here`)
    },500)
})

TERMPLAYER.addEventListener('pause', function(e) {
	vueTermplayer.playing=false;
	clearInterval(window.TERM_PLAYPOS_UPDATE);
})
