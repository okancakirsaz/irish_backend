export class EventDto{
    eventId:string
    eventName:string
    eventTime:string
    gameType?:string
    isPysicalEvent:boolean

    fromJson(json){
        this.eventId = json['eventId'],
        this.eventName=json['eventName'],
        this.eventTime=json['eventTime'],
        this.gameType=json['gameType'],
        this.isPysicalEvent=json['isPysicalEvent']
    }
}