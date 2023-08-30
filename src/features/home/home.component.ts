import { Component, ElementRef, ViewChild } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  fileSize: string;
  fileName: string;
  fileType: string;
  reader: FileReader = new FileReader();
  cityList: any;
  cityNamesArray: any;
  @ViewChild('#closebutton') closebutton: ElementRef | undefined ;

  constructor(private weatherService : WeatherService) { 
    this.fileSize = "";
    this.fileName = "";
    this.fileType = "";
  }

  ngOnInit(): void {
  }

 
  onFileSelected($event: any){
    console.log($event);
    this.fileName = $event.target.files[0].name;
    this.fileType = $event.target.files[0].type;

    var filesizeType = this.formatBytes($event.target.files[0].size);
    this.fileSize =  filesizeType.size.toString()  + ' ' + filesizeType.type.toString();
    console.log($event.target.files[0]);
     this.readFile($event.target.files[0]);
    //console.log(Filesize,"file size convertion");

    // console.log(docs, size , type);
  }

  formatBytes(bytes: number){
    console.log(bytes,"actual");
    var kb = 1024;
    console.log(Math.log(bytes),"Math.log(bytes)");
    console.log(Math.log(kb),"Math.log(kb)");
    
    var ndx = Math.floor( Math.log(bytes) / Math.log(kb) );
    console.log(ndx,"ndx");
    var fileSizeTypes = ["bytes", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"];

    return {
      size: (bytes / kb ).toFixed(2),
      type: fileSizeTypes[ndx]
    };
  }

  readFile(fileEvent: any){ 
    this.reader.onload = () => {
      let text = this.reader.result;
      this.convertToJson(text);
    };
    this.reader.readAsText(fileEvent,"UTF-8");
  };

  convertToJson(cityNames: any){
    this.cityNamesArray = cityNames.split("\r\n");
    this.cityNamesArray.forEach((value: string,index: any)=>{
      if(value== "City Name" || value == "")  this.cityNamesArray.splice(index,1);
  });
  this.getWeatherData();
  }

  getWeatherData(){
    console.log(this.cityNamesArray);
    this.weatherService.postCities(this.cityNamesArray).subscribe( response => {
      this.cityList = response;
    },
    err => { console.log(err);
    },
    () => {
      console.log("click close");
      this.closebutton?.nativeElement.click();
    })
  }

  close(){

  }

}
