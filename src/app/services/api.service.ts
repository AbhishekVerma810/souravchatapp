import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: any;
  data: any;
  userdata: any;
  constructor(private loader: LoaderService, private http: HttpClient) {}
  getLocalStorageData() {
    this.data = localStorage.getItem('user_data');
    return this.data;
  }

  async login(data: any): Promise<any> {
    this.loader.show();
    try {
      const response = await this.http.post(`${environment.baseUrl}/login`, data).toPromise();
      this.loader.hide();
      return response;
    } catch (error) {
      this.loader.hide();
      throw error;
    }
  }
  async getuserinfo(): Promise<any> {
    try {
      this.userdata = localStorage.getItem('user_data');
      console.log('userdata:', this.userdata);
      const userData = JSON.parse(this.userdata);
      const id = userData.user.id;
      console.log('User ID:', id);
      const response = await this.http.get(`${environment.baseUrl}/getUserData/${id}`).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async createGroup(data): Promise<any> {
    const response = await this.http.post(`${environment.baseUrl}/createGroup`, data).toPromise();
    return response;
  }
  async getGroups(id): Promise<any> {
    try {
      const response = await this.http.get(`${environment.baseUrl}/getGroups/${id}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error getting groups:', error);
      throw error;
    }
  }

  async getVideoCallUserinfo(userdata: any): Promise<any> {
    try {
      const response = await this.http.get(`${environment.baseUrl}/getVideoCallUserData${userdata}`).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getChatMessage(data): Promise<any> {
    try {
      const params = new HttpParams().set('senderId', data.senderId).set('reciverID', data.reciverID);
      const response = await this.http.get(`${environment.baseUrl}/getMessage`, { params }).toPromise();
      return response;
    }
    catch (error) {
      throw error;
    }
  }
  async storeChatMessage(data): Promise<any> {
    const response = await this.http.post(`${environment.baseUrl}/addMessage`, data).toPromise();
    return response;

  }
  async storeGroupMessage(data): Promise<any> {
    const response = await this.http.post(`${environment.baseUrl}/storeGroupMessage`, data).toPromise();
    return response;

  }
  async getGroupMessage(groupId): Promise<any> {
    // try {
    //   const params = new HttpParams().set('groupId', groupId);
    //   const response = await this.http.get(`${environment.baseUrl}/getGroupMessages/${ groupId }`).toPromise();
    //   return response;
    // } 
    // catch (error) {
    //   throw error;
    // }
    try {
      console.log('groupId====>', groupId)
      const response = await this.http.get(`${environment.baseUrl}/getGroupMessages/${groupId}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error getting groups:', error);
      throw error;
    }
  }
  async getAllUserData(): Promise<any> {
    try {
      const response = await this.getApi('/getAllUserData').toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async signup(data: any): Promise<any> {
    try {
      const response = await this.http.post(`${environment.baseUrl}/signup`, data).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
  getHttpHeaders() {
    const token = localStorage.getItem('user-data');
    console.log('token', token);
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
  getApi(url: any) {
    return this.http.get(`${environment.baseUrl}${url}`, this.getHttpHeaders());
  }
  postApi(url: any, formData: any) {
    console.log('url and form data', this.http.post(`${environment.baseUrl}${url}`, formData))
    return this.http.post(`${environment.baseUrl}${url}`, formData);
  }
}






// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import { LoaderService } from './loader.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {
//   userInfo: any;
//   businessData: any;
//   token: string;

//   httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'multipart/form-data',
//     }),
//   };

//   constructor(private Loader: LoaderService, private http: HttpClient) {
//     this.getLocalStorageData();
//   }

//   getLocalStorageData() {
//     this.token = localStorage.getItem('token');
//     console.log('token====>', this.token)
//     return this.token;
//   }

//   async login(data: any): Promise<any> {
//     this.Loader.show();
//     console.log('dataaaaa==', data);

//     try {
//       const response = await this.http.post(`${environment.baseUrl}/login`, data).toPromise();
//       this.Loader.hide();
//       return response;
//     } catch (error) {
//       this.Loader.hide();
//       throw error;
//     }
//   }

//   async getuserinfo(): Promise<any> {
//     try {
//       const response = await this.getApi('/getUserData').toPromise();
//       this.Loader.hide();
//       return response;
//     } catch (error) {
//       this.Loader.hide();
//       throw error;
//     }
//   }
//  async getChatMessage(data): Promise<any> {
//     try {
//       const response = await this.getApi('/getMessage',data).toPromise();
//       this.Loader.hide();
//       return response;
//     } catch (error) {
//       this.Loader.hide();
//       throw error;
//     }
//   }
//   async getAllUserData():Promise<any>{
//     try{
//        const response=await this.getApi('/getAllUserData').toPromise()
//        this.Loader.hide();
//        console.log('resresponse',response)
//        return response
//     }catch(err){
//       this.Loader.hide();
//       throw err;
//     }
//   }

//   async signup(data: any): Promise<any> {
//     try {
//       const response = await this.http.post(`${environment.baseUrl}/signup`, data).toPromise();
//       this.Loader.hide();
//       return response;
//     } catch (error) {
//       this.Loader.hide();
//       throw error;
//     }
//   }
//   getHttpHedders() {
//     this.token = localStorage.getItem('Token');
//     console.log(' this.token', this.token )
//     return {
//       headers: new HttpHeaders({
//         Authorization: `Bearer ${this.token}`,
//       }),
//     };
//   }
//   getApi(url: any) {
//     const data= this.http.get(`${environment.baseUrl}${url}`, this.getHttpHedders());
//     return data;
//   }
// }