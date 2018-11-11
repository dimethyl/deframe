

function init(name: string, options: any = null){
    if(document.readyState !== 'complete'){
        document.onreadystatechange = function () {
            if (document.readyState === "complete") {
                init(name, options);
            }
        }
        return;
    }
    const top = window.top;
    document.querySelectorAll('link[as="script"][rel="preloadmodule"]').forEach(link =>{
        const script = top.document.createElement('script') as HTMLScriptElement;
        script.src = (link as HTMLLinkElement).href;
        script.type = 'module';
        top.document.head!.appendChild(script);
    });
    const template = top.document.createElement('template') as HTMLTemplateElement;
    template.innerHTML = document.body.innerHTML;
    //console.log(script!.src)
    class Temp extends (<any>top).HTMLElement{
        constructor(){
            super();
        }
        connectedCallback(){
            const clone = template.content.cloneNode(true);
            this.appendChild(clone);
        }
    }
    top.customElements.define(name, Temp);
}

export function deframe(name: string, options: any = null){
    init(name, options)
}

