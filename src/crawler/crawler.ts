//@ts-ignore
import Librus from 'librus-api'


import {gradesConventer, oneGradeConvernter} from './data_conventer';

class Crawler {
  private client:any = new Librus();
  userUuid: string = '';

  constructor() {
  }

  public setUuid(uuid:string) {
    this.userUuid = uuid;
  }

  public async auth(login: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          reject('Timeout 20s')
      }, 20*1000);

      this.client.authorize(login, password)
          .catch((err: string) => reject('Some error in login' + err))
          .then(() => {
              this.client.info.getAccountInfo()
              .then((data: any) => {
                  if( data['account']['login'] == '') reject('Bad login or password')
                  else resolve('')
              })
          })
          
  })
  }

  public async grades(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Timeout 20s')
      }, 20*1000);

      this.client.info.getGrades()
        .catch((err:string) => reject('grades err:' + err))
        .then((data: any) => {
          resolve(gradesConventer(data));
        })
    });
  }

  public oneGrade(gradeId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Timeout 20s')
      }, 20*1000);

      this.client.info.getGrade(parseInt(gradeId))
      .catch((err:string) => reject('oneGrade err:' + err))
      .then((data: any) => {
        resolve(oneGradeConvernter(data));
      })
    })
  }

  // public messages(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       reject('Timeout 20s')
  //     }, 20*1000);

  //     this.client.info.getGrade(parseInt(gradeId))
  //     .catch((err:string) => reject('oneGrade err:' + err))
  //     .then((data: any) => {
  //       resolve(oneGradeConvernter(data));
  //     })
  //   })
  // }

}

export default Crawler