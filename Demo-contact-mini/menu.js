function Contact() {};

Contact.prototype.main = function(){

  var readlineSync = require('readline-sync');
  var fs = require('fs');

  var contacts = [];

  function loadData() {
    var text = fs.readFileSync('./data.json');
    contacts = JSON.parse(text);
  };

  function loadMenu() {

    console.log('1.Show the contact');
    console.log('2.Add new');
    console.log('3.Change');
    console.log('4.Delete')
    console.log('5.Search');
    console.log('6.Save and Exit')
    var option = readlineSync.question('> ');
  
    switch(option){
      case '1':
        showContact();
         loadMenu();
        break;
     case '2':
        addContact();
        loadMenu();
        break;
     case '3':
        changeContact();
        loadMenu();
        break;
      case '4':
        delContact();
        loadMenu();
        break;
      case '5':
        searchContact();
        loadMenu();
        break;
      case '6':
        saveAndExit();
        break;
      default:
        console.log('-----------------------------------');
        loadMenu();
    }
  };

  function showContact() {
    console.log('-----------------------------------');
    contacts.sort((a,b) => {
      for(let i=0;;i++){
        if(a.name.charCodeAt(i) == b.name.charCodeAt(i)){
          continue;
        }
        else{
          return a.name.charCodeAt(i) - b.name.charCodeAt(i);
        }
      }
    });
    for(let c of contacts){
      console.log(c.name, c.number);
    }
    console.log('-----------------------------------');
  };

  function addContact() {
    console.log('-----------------------------------');
    var temp = {};
    temp.name = readlineSync.question('Name: ');
    temp.number = parseInt(readlineSync.question('Numeber: '));
    contacts.push(temp);
    console.log('Add successfully!');
    console.log('-----------------------------------');
  };

  function searchContact() {
    console.log('-----------------------------------');
    var s = readlineSync.question('Enter the name or the number: ');
    var found = contacts.find((x) => {
      if(x.name === s || x.number == parseInt(s)){
        return true;
      }
    });
    if(!found){
      console.log('Not Found');
    }
    else{
      console.log(found.name,found.number);
    }
    console.log('-----------------------------------');
  };

  function changeContact() {
    console.log('-----------------------------------');
    var s = readlineSync.question('Enter the name or the number: ');
    var found = contacts.find((x) => {
      if(x.name === s || x.number == parseInt(s)){
        return true;
      }
    });
    while(!found){
      console.log('Not Found');
      s = readlineSync.question('Enter the name or the number: ');
      found = contacts.find((x) => {
      if(x.name === s || x.number == parseInt(s)){
        return true;
      }
    });
    }
    console.log(found.name,found.number);
    var c = readlineSync.question('Change 1.Name - 2.Number - 3.Cancel\n> ');
    switch(c){
      case '1':
        found.name = readlineSync.question('Name: ');
        console.log('Change successfully!');
        break;
      case '2':
        found.number = parseInt(readlineSync.question('Numeber: '));
        console.log('Change successfully!');
        break;
      case '3':
        console.log('-----------------------------------');
        loadMenu();
    }
    console.log('-----------------------------------');
  };

  function delContact() {
    console.log('-----------------------------------');
    var s = readlineSync.question('Enter the name or the number: ');
    var found = contacts.find((x) => {
      if(x.name === s || x.number == parseInt(s)){
        return true;
      }
    });
    while(!found){
      console.log('Not Found');
      s = readlineSync.question('Enter the name or the number: ');
      found = contacts.find((x) => {
      if(x.name === s || x.number == parseInt(s)){
        return true;
      }
    });
    }
    console.log(found.name,found.number);
    var c = readlineSync.question('Delete 1.Yes - 2.No\n> ');
    switch(c){
      case '1':
        for(let i in contacts){
          if(contacts[i].name == found.name){
            contacts.splice(i,1);
            console.log('Delete succerssfully!');
            break;
          }
        }
        break;
      case '2':default: loadMenu();
    }
    console.log('-----------------------------------');
  };

  function saveAndExit() {
    var contents = JSON.stringify(contacts);
    fs.writeFileSync('./data.json',contents,{endcoding: 'utf-8'});
    console.log('BYE BYE !!!!');
    console.log('-----------------------------------');
  };

  loadData();
  loadMenu();
}

module.exports = Contact;