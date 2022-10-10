import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, forkJoin, Observable, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { random } from '../Utils/Utilties';

@Injectable({
  providedIn: 'root'
})
export class DataEngineService {

  rss2Json = "https://api.rss2json.com/v1/api.json?rss_url="
  mossit = "https://morss.it/"

  datasourceArr = [
   "https://www.sciencedaily.com/rss/top/science.xml",
    "https://news.google.com/rss"
  ]

  datasource = new BehaviorSubject<any[]>([])
  feed = new BehaviorSubject<any>(null)

  private randomArr = []

  constructor(
    private _httpClient: HttpClient

  ) {


  }

  get() {
    return this.datasource.asObservable()
  }

  getMostRecentFeed(): Observable<any> {
    return this.datasource.pipe(
      map((data) => {

        let arr = []

        this.randomArr.forEach((item) => {
          arr.push(data[item])
        })

        return arr

      })

    )

  }

  findFeed(title) {
    return this.datasource.pipe(
      map(data => {
        
        let a = data.find(t =>t.title.toLowerCase() == title.toLowerCase())
      return a
      })
    )


  }

  search(query: string): Observable<any> {

    return this.datasource.pipe(
      map((data) => {
        let titleBased = data.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
        let contentBased = data.filter((item) => item.content.toLowerCase().includes(query.toLowerCase()))
        let authorBased = data.filter((item) => item.author.toLowerCase().includes(query.toLowerCase()))

        let result = []

        if (titleBased.length > 0) {
          result.push(
            {
              id: 'Titles',
              label: 'Titles',
              results: titleBased
            }
          )
        }

        if (contentBased.length > 0) {
          result.push(
            {
              id: 'Content',
              label: 'Content',
              results: contentBased
            }
          )
        }

        if (authorBased.length > 0) {
          result.push(
            {
              id: 'Author',
              label: 'Author',
              results: authorBased
            }
          )
        }

        return result

      })
    )
  }


  getRssFeed(): Observable<any> {

    let observer = new Observable<any>(observer => {

      let mergeable = []

      this.datasourceArr.forEach((item) => {
        let api = this._httpClient.get(this.rss2Json + this.mossit + item).pipe(
          map((data: any) => {
            return data.items
          })
        )

        mergeable.push(api)
      })

      forkJoin(mergeable).pipe(
        map((data) => {
          let merged = [].concat.apply([], data)
          return merged
        }
        )
      ).subscribe((data) => {
        console.log('data engin', data)
        observer.next(data)
        this.datasource.next(data)

        this.calculateRandomArr(data.length)
      })



    })

    return observer

  }

  saveFeed(feed) {
    return this.feed.next(feed)

  }

  private calculateRandomArr(length) {

    this.randomArr = []

    for (let index = 0; index < 3; index++) {
      this.randomArr.push(random(0, length - 1))
    }



  }

}
