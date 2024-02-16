export class EventDto{
    eventId:string
    eventName:string
    eventTime:string
    gameType?:string
    award?:string
    winner?:string
    isStarted:boolean
    isPysicalEvent:boolean

    fromJson(json){
        this.eventId = json['eventId'],
        this.award=json['award'],
        this.winner=json['winner'],
        this.eventName=json['eventName'],
        this.eventTime=json['eventTime'],
        this.gameType=json['gameType'],
        this.isStarted=json['isStarted'],
        this.isPysicalEvent=json['isPysicalEvent']
    }
}