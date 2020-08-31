pragma experimental ABIEncoderV2;
pragma solidity >=0.5.0;

contract TodoList {

    uint public itemCount = 0;

    struct Item {
       uint id;
       string text;
       bool completed;
    }
    
    mapping (uint => Item) public items;
    uint[] public itemIds;
    
    event TaskCreated (
        Item item
    );

    constructor() public {
        createTask('drink water');
        createTask('eat pant');
    }

    function getItemids() external view returns (uint[] memory) {
        return itemIds;
    }

    function createTask(string memory _text) public {
        itemCount++;
        items[itemCount] = Item(itemCount, _text, false);
        itemIds.push(itemCount);
        emit TaskCreated(Item(itemCount, _text, false));
    }

    function deleteTask(uint id) public {
        for(uint i = 0; i < itemIds.length; i++) {
            if(itemIds[i] == id) {
                itemIds[i] = itemIds[itemIds.length - 1];
                itemIds.length--;
                break;
            }
        }
        delete items[id];
    }
}
