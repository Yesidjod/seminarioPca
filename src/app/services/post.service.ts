import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  urlServer='http://51.79.26.171';
  httpHeaders = { headers: new HttpHeaders({"Content_type": "application/json"})};

  constructor(
    private http: HttpClient
  ) { }

  getPosts(page: number, perPage: number){
    return new Promise((accept, reject) => {
      this.http.get(`${this.urlServer}/posts?page=${page}&per_page${perPage}`, this.httpHeaders).subscribe(
        (data: any)=>{
            accept(data);
        },
        (error)=>{
          console.log(error);
          if (error.status==500){
            reject('Error por favor intenta mas tarde');
          }else{
            reject('Error al obtener los posts');
          }
        }
      )
    });
  }
  createPost(post_data: any){
    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/posts`, post_data, this.httpHeaders).subscribe(
        (data: any)=>{
            accept(data);
        },
        (error)=>{
          console.log(error, 'error');
          if (error.status==500){
            reject('Error por favor intenta mas tarde');
          }else{
            reject('Error al craear el posts');
          }
        }
      )
    });
  }
}
