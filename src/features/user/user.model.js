export default class usermodel{
    constructor(id,name,email,password,type){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;

    }
    static getalluser(){
        return users;
    }
    static signup(user){
        users.push(user);

    }
    static login(email,password){
        let user=users.find(user=>user.email==email && user.password==password);
        return user;
    }
}
let users=[
    {   
        id:1,
        name:"suhail",
        email:"suhail@gmail.com",
        password:"1234",
        type:"seller"
    }
];