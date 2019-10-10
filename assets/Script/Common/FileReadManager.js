// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

// cc.Class({
//     extends: cc.Component,

//     properties: {
//         // foo: {
//         //     // ATTRIBUTES:
//         //     default: null,        // The default value will be used only when the component attaching
//         //                           // to a node for the first time
//         //     type: cc.SpriteFrame, // optional, default is typeof default
//         //     serializable: true,   // optional, default is true
//         // },
//         // bar: {
//         //     get () {
//         //         return this._bar;
//         //     },
//         //     set (value) {
//         //         this._bar = value;
//         //     }
//         // },
//     },

//     // LIFE-CYCLE CALLBACKS:

//     // onLoad () {},

//     start () {

//     },

//     // update (dt) {},
// });

class FileReadManager {

    //自行传入
    readJsonFromFilePath(filePath, readCallback) {
        console.log('filePath : ' + filePath) ;
        cc.loader.load(cc.url.raw(filePath), function(err, res) {
            if(err) {
                console.log('err : ' + err) ;
            }else {
                console.log('file with path : ' + JSON.stringify(res)) ;
                if(readCallback) {
                    readCallback(res) ;
                }
            }
        }) ;
    }

    //动态加载的json脚本，脚本文件一定要放在resources目录下，默认的根目录就是resources
    readJsonFrmoFileName(fileName, readCallback) {
        console.log('file name  : ' + fileName) ;
        let jsonObj = null ;
        cc.loader.loadRes(fileName, function(err, res) {
            if(err) {
                console.log('err : ' + err) ;
            }else {
                console.log('file with path : ' + JSON.stringify(res)) ;
                if(readCallback) {
                    readCallback(res) ;
                }
            }
        }); 
    }
}

export default new FileReadManager() ;
