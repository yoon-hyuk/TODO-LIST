//1. 사용자가 이름을 입력하면
//   user div에 welcome A!가 추가된다.
//   inp의 placeholder를 변경한다.

//2. 사용자가 이름을 입력하면 기억해야하기 때문에
//   localStorage에 저장한다.

let user = JSON.parse(localStorage.getItem('user'));

let addUser = ev => {
    if(ev.keyCode == 13){
        let user = {
            name:inp.value
        }

        localStorage.setItem('user', JSON.stringify(user));
        location.reload();
    }
}

let findTodoByAboutUser = todo => {
    let userTodo = todo.filter(e=>{
        return e['user'].name == user.name
    })[0];

    return userTodo;
}

let addTodo = ev => {
    if(ev.keyCode == 13){

        let todo = JSON.parse(localStorage.getItem('todo'));

        if(!todo){
            let todo = [{'user':user,items:[inp.value]}]
            localStorage.setItem('todo', JSON.stringify(todo));
            inp.value='';
            renderTodo();
            return;
        }

        let userTodo = findTodoByAboutUser(todo);

        if(!userTodo){
            let todoItem={'user':user, items:[inp.value]};
            todo.push(todoItem);
            localStorage.setItem('todo',JSON.stringify(todo));
            inp.value='';
            renderTodo();
            return;
        }
        
        if(userTodo.items.length >= 5){
            alert('5개까지만 등록가능');
            return;
        }

        userTodo.items.push(inp.value);
        localStorage.setItem('todo', JSON.stringify(todo));
        inp.value = '';
        renderTodo();

    }
}

let renderTodo = () => {
    
    let todos = JSON.parse(localStorage.getItem('todo'));
    
    if(!todos)return;
    todoList.innerHTML = '';

    console.dir(todos);
    
    let userTodo = findTodoByAboutUser(todos);

    todoList.innnerHTML ='';

    userTodo.items.forEach((e, i)=>{
        console.dir(e);
        let icon = createElement('i',{prop:{className:'fa-solid fa-trash-can'}});
        let item = createElement('i',{prop:{className:'item'}, text:`${e}`});
        
        icon.addEventListener('click', ev=>{
            userTodo.items.splice(i,1);
            localStorage.setItem('todo',JSON.stringify(todos));
            renderTodo();
        })
        
        
        item.append(icon);
        todoList.append(item)
    })

}

let renderTime = () => {
    setInterval(()=>{

        let now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();

        hour = hour > 9 ? hour:'0'+hour;
        minute = minute > 9 ? minute:'0'+minute;
        second = second > 9 ? second:'0'+second;

        let timeText  = `${hour} : ${minute} : ${second}`;
        nowTime.innerHTML = timeText;


    },1000)
}



if(user){
    userDiv.append(createElement('span',{text:`안녕하세요!${user.name}`}));
    
    let logout = createElement('span',{prop:{className:'logout'},text:`logout`});
    
    logout.addEventListener('click',ev=>{
        localStorage.removeItem('user');
        location.reload();
    })

    userDiv.append(logout);

    inp.placeholder = '할 일을 작성하세요.';
    inp.addEventListener('keyup', addTodo);
    renderTodo();
}else{
    inp.addEventListener('keyup', addUser);
}

renderTime();