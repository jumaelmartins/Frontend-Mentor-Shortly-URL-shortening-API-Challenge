const urlBase = "https://api.shrtco.de/v2/shorten?url=";


export const shorteningLink = async (url) =>{
    
    const response = await fetch(urlBase+url);
    const results = await response.json();
    const shortenLink = await results.result;

    console.log(shortenLink.full_share_link);
}

shorteningLink("teste.com")