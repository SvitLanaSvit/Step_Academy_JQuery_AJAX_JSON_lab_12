class Person{
    #id;
    #name;
    #username;
    #adress;
    #email;
    #phone;
    #website;

    setId(id){
        this.#id = id;
    }
    setName(name){
        this.#name = name;
    }
    setUsername(username){
        this.#username = username;
    }
    setAdress(adress){
        this.#adress = adress;
    }
    setEmail(email){
        this.#email = email;
    }
    setPhone(phone){
        this.#phone = phone;
    }
    setWebsite(website){
        this.#website = website;
    }

    getId(){
    return this.#id;
    }
    getName(){
        return this.#name;
    }
    getUsername(){
        return this.#username;
    }
    getAdress(){
        return this.#adress;
    }
    getEmail(){
        return this.#email;
    }
    getPhone(){
        return this.#phone;
    }
    getWebsite(){
        return this.#website;
    }
}

let person = new Person();
const divPersons = document.getElementById("containerPersons");

$(()=>{
    $.getJSON("https://jsonplaceholder.typicode.com/users", (data)=>{
        $.each(data, (ind, elem)=>{
            const buttonPerson = document.createElement("button");
            $(buttonPerson).css('width', '230px');
            $(buttonPerson).css('height', '50px');
            $(buttonPerson).css('background-color', 'transparent');
            $(buttonPerson).css('border', '1px solid black');
            $(buttonPerson).css('margin-bottom', '20px');
            $(buttonPerson).css('display', 'flex');
            $(buttonPerson).css('justify-content', 'center');
            $(buttonPerson).css('align-items', 'center');
            $(buttonPerson).css('cursor', 'pointer');

            buttonPerson.innerText = elem.name;
            divPersons.append(buttonPerson);
            console.log(elem);  
        });
    });
});

const divTitleAdd = document.getElementById("postsId");

$(()=>{
    $("#containerPersons").click(function(e){
        divTitleAdd.innerHTML = "";

        const button = e.target;
        console.log(button);
        const list = $("#containerPersons").children();
        list.each((ind, elem)=>{
            console.log(elem);
            if(button == elem){
                $(elem).css("font-weight", 'bolder');
            }
            else{
                $(elem).css("font-weight", 'normal');
            }
        });

        $.getJSON(`https://jsonplaceholder.typicode.com/users?name=${e.target.innerText}`, (data)=>{
            person.setId(data[0].id);
            person.setName(data[0].name);
            person.setUsername(data[0].username);
            person.setAdress(data[0].address.city + ', ' + data[0].address.street);
            person.setEmail(data[0].email);
            person.setPhone(data[0].phone);
            person.setWebsite(data[0].website);

            nameId.innerText = person.getName();
            usernameId.innerText = person.getUsername();
            adressId.innerText = person.getAdress();
            emailId.innerText = person.getEmail();
            phoneId.innerText = person.getPhone();
            websiteId.innerText = person.getWebsite();
        });
    });

    $('#showPostsId').click(function(){
        divTitleAdd.innerHTML = "";

        const mainTitleOfPosts = document.createElement("h3");
        mainTitleOfPosts.innerText = "User`s posts:";
        $(mainTitleOfPosts).css("font-weight", "bolder");
        $(mainTitleOfPosts).css("text-align", "center");
        divTitleAdd.appendChild(mainTitleOfPosts);

        const mainDivAdd = document.createElement("div");
        $(mainDivAdd).css("display", "flex");
        $(mainDivAdd).css("flex-wrap", "wrap");
        $(mainDivAdd).css("justify-content", "space-between");
        $(mainDivAdd).css("margin-top", "20px");

        divTitleAdd.appendChild(mainDivAdd);
        $.get(`https://jsonplaceholder.typicode.com/posts?userId=${person.getId()}`, (data)=>{
            $.each(data, (ind,elem)=>{
                console.log(elem.title);

                const divAdd = document.createElement("div");
                $(divAdd).css("width", "360px");
                $(divAdd).css("padding", "20px");
                $(divAdd).css("border", "1px solid black");
                $(divAdd).css("margin-bottom", "20px");
                
                const titleOfDiv = document.createElement("h4");
                $(titleOfDiv).css("text-align", "center");
                $(titleOfDiv).css("font-size", "14px");
                $(titleOfDiv).css("margin-bottom", "20px");
                titleOfDiv.innerText = elem.title;

                const textOfDiv = document.createElement("p");
                $(textOfDiv).css("text-align", "justify");
                textOfDiv.innerText = elem.body;

                divAdd.appendChild(titleOfDiv);
                divAdd.appendChild(textOfDiv);
                mainDivAdd.appendChild(divAdd); 
            });
        });
    });
});