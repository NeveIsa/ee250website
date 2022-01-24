class GITHUBAPI{


    constructor(__url){
        this.url = __url;

    	this.BASE_URL = 'https://api.github.com'

        var parts = this.url.split('/')

        var subdomain = parts[2].split('.')[0]

        var lastpart = parts[parts.length-1]

        this.gist_id = subdomain === 'gist'? lastpart:''
        this.user_id = subdomain === 'github'? lastpart:''

    	this.GIST_URL = `${this.BASE_URL}/gists/${this.gist_id}`
        this.GIST_COMMENTS_URL = `${this.GIST_URL}/comments?per_page=500`
        this.USER_URL = `${this.BASE_URL}/users/${this.user_id}`
    }

    fetchstuff(url){
	    var p = function (resolve, reject){
		    //console.log(gist_url);
		    fetch(url).then(r=>r.json()).then((data)=>{
			resolve(data)
		    })
	    }
	    return new Promise(p);
    }

    get gist(){return this.fetchstuff(this.GIST_URL)}
    get gistcomments(){return this.fetchstuff(this.GIST_COMMENTS_URL)}
    get gistcommenters(){
        var url = this.GIST_COMMENTS_URL;
        var fetchstuffagain = this.fetchstuff;
        
        var p = function (resolve,reject){
            fetchstuffagain(url).then(data=>{
                var users = data.map(k=>k.user)
                resolve(users)
            })
        }

        
        return new Promise(p);
    }
    
    get user(){return this.fetchstuff(this.USER_URL)}


    
}

