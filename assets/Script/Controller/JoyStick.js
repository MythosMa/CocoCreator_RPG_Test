import Tools from "../Common/Tools";

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

const {ccclass, property} = cc._decorator ;

@ccclass
export default class JoyStick extends cc.Component {

    @property(cc.Node)
    joyStickBG = null ;

    @property(cc.Node)
    joyStickBar = null ;

    onLoad() {
        this.joyStickBG.active = false ;
        this.joyStickBar.active = false ;

        this._joyStart = false ;
        this._joyStartPos = null ;
        this._radian = -100 ;

        this.node.on(
            'touchstart', 
            (event) => {
                this._joyStart = true ;
                this.joyStickBG.active = true ;
                this.joyStickBar.active = true ;

                this._joyStartPos = this.node.convertToNodeSpaceAR(event.getLocation()) ;
                this.joyStickBG.setPosition(this._joyStartPos) ;
                this.joyStickBar.setPosition(this._joyStartPos) ;
            }
        ) ;

        this.node.on(
            'mousedown', (event) => {
                this._joyStart = true ;
                this.joyStickBG.active = true ;
                this.joyStickBar.active = true ;


                this._joyStartPos = this.node.convertToNodeSpaceAR(event.getLocation()) ;
                this.joyStickBG.setPosition(this._joyStartPos) ;
                this.joyStickBar.setPosition(this._joyStartPos) ;
            }
        ) ;

        this.node.on('touchmove', (event) => {
            if(this._joyStart) {
                let pos = this.joyStickBG.convertToNodeSpaceAR(event.getLocation()) ;
                let radian = this._radian = Tools.getRadian(pos) ;

                if(Tools.getDistance(cc.v2(0, 0), pos) <= 50) {
                    pos.x += this._joyStartPos.x ;
                    pos.y += this._joyStartPos.y ;
                    
                }else {
                    pos.x = this._joyStartPos.x + Math.cos(radian) * 50 ;
                    pos.y = this._joyStartPos.y + Math.sin(radian) * 50 ;
                }
                this.joyStickBar.setPosition(pos) ;
            }
        }) ;

        this.node.on('mousemove', (event) => {
            if(this._joyStart) {
                
                let pos = this.joyStickBG.convertToNodeSpaceAR(event.getLocation()) ;
                let radian = this._radian = Tools.getRadian(pos) ;

                //console.log('mouse radian : ' + radian) ;
                
                if(Tools.getDistance(cc.v2(0, 0), pos) <= 50) {
                    pos.x += this._joyStartPos.x ;
                    pos.y += this._joyStartPos.y ;
                    
                }else {
                    pos.x = this._joyStartPos.x + Math.cos(radian) * 50 ;
                    pos.y = this._joyStartPos.y + Math.sin(radian) * 50 ;
                }
                this.joyStickBar.setPosition(pos) ;
            }
        }) ;

        this.node.on('touchend', (event) => {
            if(this._joyStart) {
                this._joyStart = false ;
                this.joyStickBG.active = false ;
                this.joyStickBar.active = false ;

                this._radian = -100 ;
            }
        }) ;

        this.node.on('mouseup', (event) => {
            if(this._joyStart) {
                this._joyStart = false ;
                this.joyStickBG.active = false ;
                this.joyStickBar.active = false ;

                this._radian = -100 ;
            }
        }) ;

        this.node.on('touchcancel', (event) => {
            if(this._joyStart) {
                this._joyStart = false ;
                this.joyStickBG.active = false ;
                this.joyStickBar.active = false ;

                this._radian = -100 ;
            }
        }) ;

        this.node.on('mouseleave', (event) => {
            if(this._joyStart) {
                this._joyStart = false ;
                this.joyStickBG.active = false ;
                this.joyStickBar.active = false ;

                this._radian = -100 ;
            }
        }) ;
    }    
    
}
