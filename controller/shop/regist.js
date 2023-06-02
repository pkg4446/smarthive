const basket    = require('../../models/shop/basket');
const item      = require('../../models/shop/item');
const item_pic  = require('../../models/shop/item_pic');

module.exports  = {    

    item    : async function(data){
        try {    

            let IDX;
            await item.create({
                EMAIL:      data.EMAIL,
                KATEGORIE:  data.KATEGORIE,
                STOCK:      data.STOCK,
                PRICE:      data.PRICE,
                DELIVERY:   data.DELIVERY,
                TITLE:      data.TITLE,
                TEXT:       data.TEXT,
            })
            .then(async function(response){
                IDX = response.IDX;
            });
            return IDX;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    pic     : async function(IDX,EMAIL,FILE_NAME){
        try {            
            await item_pic.create({
                ITEM_IDX:   IDX,
                EMAIL:      EMAIL,
                FILE_NAME:  FILE_NAME
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    basket  : async function(data){
        try {            
            await basket.create({
                EMAIL:      data.EMAIL,
                ITEM_IDX:   data.IDX,
                PIECE:      data.PIECE,
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

}