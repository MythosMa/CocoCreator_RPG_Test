import IndependentEvent from "../Event/IndependentEvent";

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
export default class NPC extends cc.Component {
    @property
    speed = 0 ;

    @property
    roleName = '' ;

    @property(cc.Node)
    talkTip = null ;

    onLoad() {

        this.characterState = {
            can_talk : true,
            self_task_info : 0,
            current_ai_json : ''
        } ;

        this.State = cc.Enum({
            STATE_STAND : 1,
            STATE_WALK_LEFT : -1,
            STATE_WALK_RIGHT : -1,
        }) ;
        this._currentState = this.State.STATE_STAND ;

        this._animDisplay = this.getComponent(dragonBones.ArmatureDisplay) ;

        this._events = this.getComponents(IndependentEvent) ;
        console.log('event count : ' + this._events.length) ;
    }

    update(dt) {
        
    }

    canTalk() {
        return this.characterState.can_talk ;
    }

    showTalkTip(isShow) {
        this.talkTip.active = isShow ;
    } 

    changeState(state) {
        if(this._currentState === state) {
            return ;
        }

        let standArmatureName = this.roleName + 'Stand' ;
        let walkFrontArmatureName = this.roleName + 'WalkFront' ;

        switch(state) {
            case this.State.STATE_STAND:
                this.changeAnimation(standArmatureName, standArmatureName, 0) ;
                break ;
            case this.State.STATE_WALK_LEFT:
                this.changeAnimation(walkFrontArmatureName, walkFrontArmatureName, 0) ;
                this.node.setScale(-1 * Math.abs(this.node.scaleX), this.node.scaleY) ;
                break ;
            case this.State.STATE_WALK_RIGHT:
                this.changeAnimation(walkFrontArmatureName, walkFrontArmatureName, 0) ;
                this.node.setScale(Math.abs(this.node.scaleX) , this.node.scaleY) ;
                break ;
        }

        this._currentState = state ;
    }

    changeFaceTo(isLeft) {
        if(isLeft) {
            this.node.scaleX = Math.abs(this.node.scaleX) * -1 ;
            this.talkTip.scaleX = Math.abs(this.talkTip.scaleX) * -1 ;
        }else {
            this.node.scaleX = Math.abs(this.node.scaleX) ;
            this.talkTip.scaleX = Math.abs(this.talkTip.scaleX) ;
        }
    }
}
