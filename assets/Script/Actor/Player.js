import RoleManager from "./RoleManager";
import NPC from "./NPC";
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
export default class Player extends cc.Component {

    @property(cc.Node)
    joyStick = null ;

    @property
    speed = 0 ;

    @property
    talkDistance = 0 ;

    onLoad() {

        this.State = cc.Enum({
            STATE_STAND : 1,
            STATE_WALK_LEFT : -1,
            STATE_WALK_RIGHT : -1,
        }) ;
        this._currentState = this.State.STATE_STAND ;

        this.joyStickController = this.joyStick.getComponent('JoyStick') ;
        this._animDisplay = this.getComponent(dragonBones.ArmatureDisplay) ;
        this.talkRole = null ;
    }

    update(dt) {
        let radian = this.joyStickController._radian ;

        if(radian != -100) {
            if(-0.5 <= radian && radian <= 0.5) {
                this.changeState(this.State.STATE_WALK_RIGHT) ;
                let dis = this.speed * dt ;
                this.node.x = this.node.x+ dis ;
                this.checkNPCTalk() ;
            }else if((2.5 <= radian && radian <= Math.PI) || (-1 * Math.PI <= radian && radian <= -2.5)) {
                this.changeState(this.State.STATE_WALK_LEFT) ;
                let dis = this.speed * dt * -1 ; 
                this.node.x = this.node.x + dis ;
                this.checkNPCTalk() ;
            }else {
                this.changeState(this.State.STATE_STAND) ;
            }
        }else {
            this.changeState(this.State.STATE_STAND) ;
        }
    }

    changeState(state) {
        if(this._currentState === state) {
            return ;
        }

        switch(state) {
            case this.State.STATE_STAND:
                this.changeAnimation('SakuyaStand', 'SakuyaStand', 0) ;
                break ;
            case this.State.STATE_WALK_LEFT:
                this.changeAnimation('SakuyaWalkFront', 'SakuyaWalkFront', 0) ;
                this.node.setScale(-1 * Math.abs(this.node.scaleX), this.node.scaleY) ;
                break ;
            case this.State.STATE_WALK_RIGHT:
                this.changeAnimation('SakuyaWalkFront', 'SakuyaWalkFront', 0) ;
                this.node.setScale(Math.abs(this.node.scaleX) , this.node.scaleY) ;
                break ;
        }

        this._currentState = state ;
    }

    changeAnimation(armatureName, animationName, playTimes, callbacks) {
        if(this._animDisplay.armatureName === armatureName && this._animDisplay.animationName === animationName ) {
            return ;
        }

        if(this._animDisplay.armatureName !== armatureName) {
            this._animDisplay.armatureName = armatureName ;
        }

        this._animDisplay.playAnimation(animationName, playTimes) ;
    }

    checkNPCTalk() {
        let playerPosition = this.node.position ;
        let roleManager = cc.find('Canvas/RolePlayer').getComponent(RoleManager) ;

        let npcs = roleManager.getNPC() ;

        let distance = 99999999 ;
        let talkRoleTemp = null ;
        for(let index in npcs) {
            if(!npcs[index].getComponent(NPC).canTalk()){
                continue ;
            }
            let npcPosition = npcs[index].position ;
            let distanceTemp = Tools.getDistance(playerPosition, npcPosition) ;

            if(distanceTemp > this.talkDistance) {
                npcs[index].getComponent(NPC).showTalkTip(false) ;
            }

            if( distanceTemp < this.talkDistance && distanceTemp < distance) {
                distance = distanceTemp ;
                talkRoleTemp = npcs[index] ;
            }
        }

        if(distance === 99999999) {
            if(this.talkRole !== null) {
                this.talkRole.getComponent(NPC).showTalkTip(false) ;
                this.talkRole = null ;
            }
        }else {
            if(this.talkRole !== null) {
                if(this.talkRole !== talkRoleTemp) {
                    this.talkRole.getComponent(NPC).showTalkTip(false) ;
                    this.talkRole = talkRoleTemp ;
                }
                this.talkRole.getComponent(NPC).showTalkTip(true) ;
            }else {
                this.talkRole = talkRoleTemp ;
                this.talkRole.getComponent(NPC).showTalkTip(true) ;
            }
        }
    }

    attackButtonPress() {
        if(this.talkRole !== null) {
            let isOnLeft = (this.node.position.x - this.talkRole.position.x) < 0 ? true : false ;

            if(isOnLeft) {
                this.node.scaleX = Math.abs(this.node.scaleX) ;
                this.talkRole.getComponent(NPC).changeFaceTo(true) ;
            }else {
                this.node.scaleX = Math.abs(this.node.scaleX) * -1 ;
                this.talkRole.getComponent(NPC).changeFaceTo(false) ;
            }
        }
    }
}