import axios from 'axios'

import { ICheckinDTO, ICheckinModel, CheckinModel } from '../models'

export const getCheckins = (oAuthToken: string): Promise<ICheckinModel[]> => {
  const timeStamp = '20190607'
  return axios
    .get<{ response: { checkins: { items: ICheckinDTO[] } } }>(
      `https://api.foursquare.com/v2/users/self/checkins?oauth_token=${oAuthToken}&v=${timeStamp}`
    )
    .then(res =>
      res.data.response.checkins.items.map(checkin =>
        CheckinModel.create(checkin)
      )
    )
}
