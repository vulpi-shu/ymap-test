angular.module('lgx').constant('data',
  {
    tree: [
      {
        type: 'country',
        name: 'Россия',
        children: [
          {
            type: 'area',
            name: 'НСО',
            children: [
              {
                name: 'Участники системы',
                children: [
                  {
                    id:   '1',
                    type: 'role',
                    name: 'Перевозчики'
                  },
                  {
                    id:   '2',
                    type: 'role',
                    name: 'Склады'
                  },
                  {
                    id:   '3',
                    type: 'role',
                    name: 'Брокеры'
                  }
                ]
              },
              {
                name: 'Города',
                children: [
                  {
                    id:   '1',
                    type: 'city',
                    name: 'Новосибирск'
                  },
                  {
                    id:   '2',
                    type: 'city',
                    name: 'Бердск'
                  },
                  {
                    id:   '3',
                    type: 'city',
                    name: 'Искитим'
                  }
                ]
              }
            ]
            // END AREA
          }
        ]
      }
    ],
    orgs: [
      {
        name: 'Organization 1',
        coords: {

        }
      }
    ]
  }
)