export interface ICheckinDTO {
    createdAt: number
    shout: string
    venue: IVenueDTO
}

export interface IVenueDTO {
    name: string
    location: {
        formattedAddress: string[]
    }
}

export interface ICheckinModel {
    createdAt: number
    shout: string
    venue: IVenueDTO

    serialize(): ICheckinDTO
}

export interface IVenueModel {
    name: string
    location: {
        formattedAddress: string[]
    }
    serialize(): IVenueDTO
}

export class CheckinModel implements ICheckinModel {
    constructor(
        public createdAt: number,
        public shout: string,
        public venue: IVenueModel
    ) { }

    static create(dto: ICheckinDTO): ICheckinModel {
        return new CheckinModel(
            dto.createdAt,
            dto.shout,
            VenueModel.create(dto.venue)
        )
    }

    serialize(): ICheckinDTO {
        return {
            createdAt: this.createdAt,
            shout: this.shout,
            venue: this.venue.serialize()
        }
    }
}

export class VenueModel implements IVenueModel {
    constructor(public name: string, public location: { formattedAddress: string[] }) { }

    static create(dto: IVenueDTO): IVenueModel {
        return new VenueModel(dto.name, dto.location)
    }

    serialize(): IVenueDTO {
        return {
            name: this.name,
            location: this.location
        }
    }
}
