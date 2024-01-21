import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { transform } from 'ol/proj';
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { click } from 'ol/events/condition';
import { LineString, Point, Polygon } from 'ol/geom';
import { ApiService } from 'src/app/services/api.service';
import { jsPanel } from 'jspanel4';
import { JsPanelService } from 'src/app/services/js-panel.service';
import { DialogService } from 'src/app/services/dialog.service';
import { AddCoordinateDialogComponent } from 'src/app/dialog/add-coordinate-dialog/add-coordinate-dialog.component';
import { ListCoordinateDialogComponent } from 'src/app/dialog/list-coordinate-dialog/list-coordinate-dialog.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  constructor(private apiService: ApiService,
    private jsPanelService: JsPanelService,
    private dialogService: DialogService) { }
  map: Map;

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const turkeyCenter = transform([35.8617, 38.9637], 'EPSG:4326', 'EPSG:3857');

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: turkeyCenter,
        zoom: 6
      })
    });
  }

  drawPolygon() {
    const source = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: source
    });

    this.map.addLayer(vectorLayer);

    const draw = new Draw({
      source: source,
      type: 'Polygon',

    });

    this.map.addInteraction(draw);

    draw.on('drawend', async (event: any) => {

      const drawnFeature = event.feature;
          const data = drawnFeature.getGeometry().getCoordinates();

      this.dialogService.openDialog({
        componentType: AddCoordinateDialogComponent,
        data: data,
        afterClosed: () => {
          
          
        }
      })






      // await this.apiService.create(data)

    });

    // Çizim işlemi bitmeden önce önceki çizim işlemlerini temizle
    draw.on('drawstart', (event: any) => {
      //source.clear();
    });
  }

  finishDrawing() {
    // Çizim işlemini devre dışı bırak
    debugger;
    const drawInteraction = this.map.getInteractions().getArray()
      .find(interaction => interaction instanceof Draw) as Draw;
    if (drawInteraction) {
      drawInteraction.finishDrawing();
    }
  }

  async drawendHandler(event: any) {
    const drawnFeature = event.feature;
    let data = drawnFeature.getGeometry().getCoordinates();

    await this.apiService.create(data)




    // Çizilen geometrinin türüne bağlı olarak işlemler yapabilirsiniz
    if (drawnFeature.getGeometry() instanceof Point) {
      // Eğer çizilen geometri bir noktaysa
      const pointCoordinates = drawnFeature.getGeometry().getCoordinates();
      console.log('Seçilen Noktanın Koordinatları:', pointCoordinates);
    } else if (drawnFeature.getGeometry() instanceof LineString) {
      // Eğer çizilen geometri bir çizgi ise
      const lineCoordinates = drawnFeature.getGeometry().getCoordinates();
      console.log('Çizilen Çizginin Koordinatları:', lineCoordinates);
    } else if (drawnFeature.getGeometry() instanceof Polygon) {
      // Eğer çizilen geometri bir poligon ise
      const polygonCoordinates = drawnFeature.getGeometry().getCoordinates();
      console.log('Çizilen Poligonun Koordinatları:', polygonCoordinates);
    }
  }


  show(){
    this.dialogService.openDialog({
      componentType: ListCoordinateDialogComponent,
      data: 1
    })
  }

}
