const basket    = require('../../models/shop/basket');
const item      = require('../../models/shop/item');
const item_pic  = require('../../models/shop/item_pic');
const store     = require('../../models/shop/store');

module.exports  = {
    store   : async function(data){
        try {            
            await store.create({
                EMAIL:      data.EMAIL,
                NAME:       data.NAME,
                ADDRESS:    data.ADDR,
                TEXT:       data.TEXT,
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    item    : async function(data){
        try {    

            let IDX;
            await item.create({
                EMAIL:      data.EMAIL,
                STOCK:      data.STOCK,
                PRICE:      data.PRICE,
                DELIVERY:   data.DELIVERY,
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

    item_pic    : async function(data){
        try {            
            await item.create({
                ITEM_IDX:   data.IDX,
                PATH:       data.PATH,
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