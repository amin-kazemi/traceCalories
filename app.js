//--------Storage Controller
//Storage controller for local storage which i add at the end of the project
const StorageCtrl = (function(){


  //Public Methods
return{
  
}
})()




//--------Item Controller
//Item controller for  local datas
const ItemCtrl = (function(){
  //Item constructor: to create items
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data structure or state
  const data = {
    items: [
      // {id: 0, name: "Ice Cream", calories: 450},
      // {id: 1, name: "Cookie", calories: 600},
      // {id: 2, name: "Eggs", calories: 300}
    ],
    currentItem: null, //currentItem is the item which we want to edit or update it in the input so we call it currentItem and set it to null.
    totalCalories: 0
  }

  //Public Methods
  return{
    //Returning items in public: for displaing in ui
    getItems: function(){
      return data.items;
    },

    //Add new item to the array of data
    addItem: function(name, calories){
      //Creating ID
      let ID;
      if(data.items.length > 0){
                        //item index length has to be -1 then adding 1 to id
        ID = data.items[data.items.length -1].id + 1;
      }else{
        ID = 0;
      }

      //Calories to number
      calories = parseInt(calories);

      //Create new item
      const newItem = new Item (ID, name, calories);

      //Push new item to array of datas
      data.items.push(newItem);

      //we Return new item because we use the newItem variable in main App 
      return newItem
    },

    //Get item by ID (for edit)
    getItemById: function(id){
      //Looping throw the items and look if they match with the item we whant to edit

      let found = null;

      data.items.forEach(function(item){
        if(item.id === id){
          found = item ;
        }
      });
      return found;
    },

    //get update item
    updateItem: function(name, calories){
      //chang the calories to number
       calories = parseInt(calories);

      //Loop throw the items to check the update curent item and items in data array are the same in order to change the item
      let found = null;

      data.items.forEach(function(item){
        if(item.id === data.currentItem.id)
          item.name = name;
          item.calories = calories;
          found = item;
      });
      return found;
    },//now item updated in data structure but it is not in the UI


    //Delete item from data structure
    deleteItem: function(id){
      //Get Ids
      const ids = data.items.map(function(item){
        return item.id;
      })

      //Get index
      const index = ids.indexOf(id);

      //Remove item
      data.items.splice(index, 1);
    },

    clearAllItems: function(){
      data.items = [];
    },

    //setCurrentItem method
    setCurrentItem: function(itemToEdit){
      data.currentItem = itemToEdit;
    },
    

    getCurrentItem: function(){
      return data.currentItem;
    },

    //Total calories
    getTotalCalories: function(){
      //Looping throw each items and add calories
      let total = 0;
      data.items.forEach(item => total += item.calories);//or total = total + item.calories

      //Set total calories to data structure
      data.totalCalories = total;

      //Return total
      return data.totalCalories;
    },

    //Returning datas in public
    logData: function(){
      return data;
    }
  }
})()

// console.log(ItemCtrl.logData());
// console.log(ItemCtrl.getItems());




//--------Ui Controller
//UI controller for anything to do with the UI. 

const UICtrl = (function(){

  //Create UISelectors: To organize my classes and IDs
  const UISelectors = {
    itemList: '#item-list',
    itemLists: '.collection',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    backBtn: '.back-btn',
    deleteBtn: '.delete-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCals: '.total-calories'
  }


  //Public Methods
  return{
    populateItemList: function(items){
      let html = "";

      //Looping throw in the array to fetch each item
      items.forEach(item => {
        html += `
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories}</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`
      });
      
      //Insert list item in UI
      document.querySelector(UISelectors.itemList).innerHTML = html;//I'm going to create UISelectors object to put all my UI classes and IDs here to organize
    },

    //Get Item Input
    getItemInput: function(){
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      } 
    },

    //Create li element: to display it in UI
    addListItem: function(item){
      //Create li element
      const li = document.createElement('li');
      //Add class
      li.className = 'collection-item';
      //Add ID
      li.id = `item-${item.id}`;
      //Inner HTML
      li.innerHTML = ` <strong>${item.name}: </strong> <em>${item.calories} calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      //Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },

    //Update list items in UI
    updateListItems: function(updatedItem) {            
        const li = document.querySelector(`#item-${updatedItem.id}`);
        if(li !== null) {
          document.querySelector(`#item-${updatedItem.id}`).innerHTML = `<strong>${updatedItem.name}:</strong>  <em>${updatedItem.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
        }
        
    },

    deleteListItem: function(id){
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },

    removeAllItems: function(){
      let listItems = document.querySelectorAll(UISelectors.itemLists);

      listItems = Array.from(listItems);

      listItems.forEach(function(item){
        item.remove();
      });
    },

    //Clear Input field
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    //Add item to show in form(edit)
    addItemToForm: function(){
      //
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      //Manage buttones to show in edit mode
      UICtrl.ShowEditBtn();
    },

    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCals).textContent = totalCalories;
    },

  
    clearEditState: function(){
      //Clear input fields
      UICtrl.clearInput();
      //Manage buttons
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },

    ShowEditBtn: function(){
      //Manage buttons
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    

    //Return UISelctors in order to use in public
    getSelectors: function(){
      return UISelectors;
    }
  }
})()






//--------Main App
//Main app, where everything will meet, And i am going to put  initial event listeners and initialiser init function there.

            //Adding all controller to App Controller
const App = (function(ItemCtrl, UICtrl){

  //Creating Load Event Listeners function
  const loadEventListeners = function(){

    //Get UI Selectors:In order to use UISelectors in APP 
    const UISelectors = UICtrl.getSelectors();


    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    //Disable submit on enter press
    document.addEventListener('keypress', function(e){
      //Check whick key was hit: by using (keyCode) property.
      //Enter keyCode is (13), 
      //Older browser may not support (keyCode)  so we need use (Which)
      if(e.keyCode === 13 || e.which === 13){

        e.preventDefault();
        return false;
      }
    });

     //Edit icon click event listeners (creating event deligation)
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update event listeners
    document.querySelector(UISelectors.updateBtn).addEventListener('click', 
    itemUpdateSubmit);


    //Back button event listeners
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
    
    
    //Delete button event listeners
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);


    //clear all event listeners
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemEvent);

  }

  






  
  //itemAddSubmit function
  const itemAddSubmit = function(e){

    //Get item input from UI 
     const input = UICtrl.getItemInput();

     //Validation the input form(name and calories)
     if(input.name !== '' && input.calories !== ''){

      //Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      //Add item to UI list
      UICtrl.addListItem(newItem);
     }

      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //Display total calories in UI
      UICtrl.showTotalCalories(totalCalories);

      //Clear Input Field
      UICtrl.clearInput();

    e.preventDefault();
  }

  

  //itemEditClick function
  const itemEditClick = function(e){
    if(e.target.classList.contains('edit-item')){
      // We want to fill the item which we clicked to edit to the current item, which its equal to null

      //Get the list item ID 
      const listID = e.target.parentElement.parentElement.id;
      // console.log(listID);

      //Note: it is not actual item ID(which is 0 1 2 ...) so in order to get actual item ID we need break into the array and split it to the - so we get the actual ID.

      //Break into the array and split it
      const listIdArry = listID.split('-');//now it returns array of item(2) ["item", "0"]
      //but we need just the ID not item

      //Get the id and parse it as number
      const id = parseInt(listIdArry[1]);


      //Now we have ID, SO we need to get entire object or item

      //Get item
      const itemToEdit = ItemCtrl.getItemById(id);//return Item {id: 0, name: "hhh", calories: 333}

      //Now we need to set the item to current item
      ItemCtrl.setCurrentItem(itemToEdit);


      //Now i want to add the item to the form to show
      UICtrl.addItemToForm();
      
    }

    e.preventDefault();
  }


  //itemUpdateSubmit function
  const itemUpdateSubmit = function(e){
    //Get the UI input value
    const input = UICtrl.getItemInput();

    //Update input
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    //Update item in UI
    UICtrl.updateListItems(updatedItem);


    //Get total calories
     const totalCalories = ItemCtrl.getTotalCalories();
     //Display total calories in UI
     UICtrl.showTotalCalories(totalCalories);
    //Clear edit state
    UICtrl.clearInput();

    e.preventDefault();
  }



    //itemDeleteSubmit function
    const itemDeleteSubmit = function(e){
      //Get item id from current item
      const currentItem = ItemCtrl.getCurrentItem();
  
      //Delete current item from data structure
      ItemCtrl.deleteItem(currentItem);


      //Delete item from UI
      UICtrl.deleteListItem(currentItem.id);

      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //Display total calories in UI
      UICtrl.showTotalCalories(totalCalories);

      //Clear Input Field
      UICtrl.clearInput();

  
      e.preventDefault();
    }



    //clearAllItemEvent function
    const clearAllItemEvent = function(){
        //Delete all items from data structure
        ItemCtrl.clearAllItems();

        //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //Display total calories in UI
      UICtrl.showTotalCalories(totalCalories);

        //Delete all items from UI
        UICtrl.removeAllItems()


    }




//Return Init function or method to run anything in the app right away during application loades

//Public Methods
return{
  init: function(){

    //Clear edit state / set initial set
    UICtrl.clearEditState();

    //Fetching items from data structure
    const items = ItemCtrl.getItems();


    //Populat list with item
    UICtrl.populateItemList(items);


    //-------?--------
     //Get total calories
     const totalCalories = ItemCtrl.getTotalCalories();
     //Display total calories in UI
     UICtrl.showTotalCalories(totalCalories);
  

     
    //Load event listeners
    loadEventListeners();
  }
}
  
})(ItemCtrl, UICtrl)








//Initialize App
App.init();