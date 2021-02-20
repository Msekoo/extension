// 设计组件体系，声明语言和编程语言的交界 attribute和property可以区分开来
function createElement(Cls, attributes, ...children) {
    
    let o;

    if(typeof Cls === "string") {
        o = new Wrapper(Cls);
    } else {
        o = new Cls({
            timer: {}
        });
    }



    for(let name in attributes) {
        o.setAttribute(name, attributes[name]);
    }

    let visit = (children) => {
        for (let child of children) {
            if (typeof child === 'object' && child instanceof Array) {
                visit(child);
                continue;
            }
            if(typeof child === "string") 
                child = new Text(child);
    
            o.appendChild(child);
        }
    }
    visit(children);
    return o;
}


class Text {
    constructor(text){
        this.children = [];
        this.root = document.createTextNode(text);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

class Wrapper{
    constructor(type){
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value) { //attribute
        this.root.setAttribute(name, value);
    }

    appendChild(child){
        this.children.push(child);

    }

    addEventListener() {
        this.root.addEventListener(...arguments);
    }
    
    get style() {
        return this.root.style;
    }

    mountTo(parent){
        parent.appendChild(this.root);

        for(let child of this.children){
            child.mountTo(this.root);
        }
    }

}

class Carousel {
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    setAttribute(name, value) { //attribute
        this.attributes.set(name, value);
    }

    appendChild(child){
        this.children.push(child);
    }

    render() {
        let data = this.attributes.get('data')
        let children = data.map(url => {
            let element = <img src={url} />;
            element.addEventListener("dragstart", event => event.preventDefault());
            return element;
        })
            
        let root = <div class="carousel">
            { children }
        </div>
        let position = 0;

        let nextPic = () => {
            let nextPosition = (position + 1) % data.length;

            let current = children[position];
            let next = children[nextPosition];

            current.style.transition = "ease 0s";
            next.style.transition = "ease 0s";

            current.style.transform = `translateX(${- 100 * position}%)`;
            next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

            setTimeout(() => {
                // means use css rule
                current.style.transition = "";
                next.style.transition = "";

                current.style.transform = `translateX(${- 100 - 100 * position}%)`;
                next.style.transform = `translateX(${- 100 * nextPosition}%)`;

                position = nextPosition;
            }, 16)

            setTimeout(nextPic, 3000);
        }

        root.addEventListener("mousedown", event => {
            let startX = event.clientX, startY = event.clientY;
            let nextPosition = (position + 1) % data.length;
            let lastPosition = (position - 1 + data.length) % data.length;
            let current = children[position];
            let last = children[lastPosition];
            let next = children[nextPosition];

            current.style.transition = "ease 0s";
            last.style.transition = "ease 0s";
            next.style.transition = "ease 0s";

            current.style.transform = `translateX(${- 500 * position}px)`
            last.style.transform = `translateX(${- 500 - 500 * lastPosition}px)`
            next.style.transform = `translateX(${500 - 500 * nextPosition}px)`

            let move = event => {
                current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`
                last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`
                next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`
            };
            let up = event => {
                let offset = 0;

                if (event.clientX - startX > 250) {
                    offset = 1;
                } else if (event.clientX - startX < -250) {
                    offset = -1;
                }

                current.style.transition = "";
                last.style.transition = "";
                next.style.transition = "";

                current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
                last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`
                next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`

                position = (position - offset + data.length) % data.length;;

                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        })
        setTimeout(nextPic, 3000);

        return root
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}

export {
    createElement,
    Carousel
}