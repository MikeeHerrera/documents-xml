import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-document-xml',
  templateUrl: './document-xml.component.html',
  styleUrls: ['./document-xml.component.css']
})
export class DocumentXmlComponent {
 datosxml:any;
 nameFile:any;
  constructor(
    private router: ActivatedRoute,
    private http: HttpClient
  ){
    this.router.params.subscribe((result:any) =>{
    this.nameFile = result.nombre;
      const datos = 'id=' + result.id + '&Tipo=' + 'XML';
      this.consultaCFDI(datos);
      console.log(result)
    });

  }


  consultaCFDI(dataToSend:any) {
    return this.http
      .post('https://consulta-cfdi.starmedica.com:8086/RestApi/ConsultaCFDI', dataToSend, {
        headers: this.getHttpHeaders(),
      }).forEach((result:any) =>{
       const datos = JSON.parse(result);
       this.datosxml = datos;
       this.savexml();
      });
  }

  savexml(){
    const dataBlob = this.b64toBlob(this.datosxml.file,'text/xml',512);
    var a = document.createElement("a"),
   url = URL.createObjectURL(dataBlob);
    a.href = url;
    a.download = this.nameFile;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
  }

  b64toBlob(b64Data:any, contentType:any, sliceSize:any) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  public getHttpHeaders() {
    return new HttpHeaders({
      "content-Type": "application/x-www-form-urlencoded",
    });
  }
}
