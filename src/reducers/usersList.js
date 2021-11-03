
const initialState = {
  users: [{"created_time":{"year":{"low":2021,"high":0},"month":{"low":11,"high":0},"day":{"low":1,"high":0},"hour":{"low":20,"high":0},"minute":{"low":2,"high":0},"second":{"low":19,"high":0},"nanosecond":{"low":483000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0}},"role":"Admin","projects":"GDC,CTDC,ICDC","last_updated_time":{"year":{"low":2021,"high":0},"month":{"low":11,"high":0},"day":{"low":1,"high":0},"hour":{"low":20,"high":0},"minute":{"low":2,"high":0},"second":{"low":19,"high":0},"nanosecond":{"low":483000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0}},"nci_username":"test","organization":"NCI","last_name":"Admin","active":"N","id":1,"first_name":"Admin","email":"test@test.com"},{"created_time":{"year":{"low":2021,"high":0},"month":{"low":11,"high":0},"day":{"low":1,"high":0},"hour":{"low":20,"high":0},"minute":{"low":2,"high":0},"second":{"low":19,"high":0},"nanosecond":{"low":483000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0}},"role":"Admin","projects":"GDC,CTDC,ICDC","last_updated_time":{"year":{"low":2021,"high":0},"month":{"low":11,"high":0},"day":{"low":1,"high":0},"hour":{"low":20,"high":0},"minute":{"low":2,"high":0},"second":{"low":19,"high":0},"nanosecond":{"low":483000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0}},"nci_username":"wuye","organization":"NCI","last_name":"Wu","active":"Y","id":2,"first_name":"Ye","email":"wuye@nih.gov"},{"created_time":{"year":{"low":2021,"high":0},"month":{"low":11,"high":0},"day":{"low":1,"high":0},"hour":{"low":20,"high":0},"minute":{"low":2,"high":0},"second":{"low":19,"high":0},"nanosecond":{"low":483000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0}},"role":"Admin","projects":"GDC,CTDC,ICDC","last_updated_time":{"year":{"low":2021,"high":0},"month":{"low":11,"high":0},"day":{"low":1,"high":0},"hour":{"low":20,"high":0},"minute":{"low":2,"high":0},"second":{"low":19,"high":0},"nanosecond":{"low":483000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0}},"nci_username":"yuw5","organization":"NCI","last_name":"Yu","active":"Y","id":3,"first_name":"Wei","email":"wei.yu@nih.gov"},{"created_time":{"year":{"low":2021,"high":0},"month":{"low":11,"high":0},"day":{"low":1,"high":0},"hour":{"low":20,"high":0},"minute":{"low":2,"high":0},"second":{"low":19,"high":0},"nanosecond":{"low":483000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0}},"role":"Admin","projects":"GDC,CTDC,ICDC","last_updated_time":{"year":{"low":2021,"high":0},"month":{"low":11,"high":0},"day":{"low":1,"high":0},"hour":{"low":20,"high":0},"minute":{"low":2,"high":0},"second":{"low":19,"high":0},"nanosecond":{"low":483000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0}},"nci_username":"mirandafm","organization":"NCI","last_name":"Miranda","active":"Y","id":4,"first_name":"Francisco","email":"francisco.miranda@nih.gov"},{"created_time":{"year":{"low":2021,"high":0},"month":{"low":11,"high":0},"day":{"low":1,"high":0},"hour":{"low":20,"high":0},"minute":{"low":2,"high":0},"second":{"low":19,"high":0},"nanosecond":{"low":483000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0}},"role":"Admin","projects":"GDC,CTDC,ICDC","last_updated_time":{"year":{"low":2021,"high":0},"month":{"low":11,"high":0},"day":{"low":1,"high":0},"hour":{"low":20,"high":0},"minute":{"low":2,"high":0},"second":{"low":19,"high":0},"nanosecond":{"low":483000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0}},"nci_username":"bensonml","organization":"NCI","last_name":"Benson","active":"Y","id":5,"first_name":"Mark","email":"mark.benson@nih.gov"},{"created_time":{"year":{"low":2021,"high":0},"month":{"low":11,"high":0},"day":{"low":1,"high":0},"hour":{"low":20,"high":0},"minute":{"low":2,"high":0},"second":{"low":19,"high":0},"nanosecond":{"low":483000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0}},"role":"Admin","projects":"GDC,CTDC,ICDC","last_updated_time":{"year":{"low":2021,"high":0},"month":{"low":11,"high":0},"day":{"low":1,"high":0},"hour":{"low":20,"high":0},"minute":{"low":2,"high":0},"second":{"low":19,"high":0},"nanosecond":{"low":483000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0}},"nci_username":"zhangchao","organization":"NCI","last_name":"Zhang","active":"Y","id":6,"first_name":"Chao","email":"chao.zhang3@nih.gov"}]
}

// root reducer
export default function reducer(state = initialState, action = {type: null}) {
  switch(action.type) {
      case 'users/userAdded': {
        const user = action.payload
        return {
          ...state,
          [user.id]: user,
        }
      }
      
      case 'users/changedStatus': {
        const userId = action.payload
        const user = state[userId]
        return {
            ...state,
            [userId]: {
              ...user,
              active: user.active !== 'Y' ? 'Y': 'N',
          },
        }
      }

      case 'users/todosLoaded': {
        const users = {}
        action.payload.forEach((user) => {
          users[user.id] = user
        })
        return {
          users,
        }
      }

      default:
          return state;
  }
}
