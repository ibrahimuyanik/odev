import { Component } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, transform } from 'ol/proj';
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {  LineString, Point, Polygon } from 'ol/geom';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { AddCoordinateDialogComponent } from 'src/app/dialog/add-coordinate-dialog/add-coordinate-dialog.component';
import { ListCoordinateDialogComponent } from 'src/app/dialog/list-coordinate-dialog/list-coordinate-dialog.component';
import { CoordinateData } from 'src/app/contracts/coordinate-data.model';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  constructor(private apiService: ApiService,
    private dialogService: DialogService) { }
  map: Map;
  polygonData:CoordinateData[]

  vectorLayer: VectorLayer<any>;
  vectorSource: VectorSource;

 
  
  ngOnInit() {
    this.initMap();
    this.loadPolygonData()
    
  }

  initMap() {

    this.vectorSource = new VectorSource();

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    const turkeyCenter = transform([35.8617, 38.9637], 'EPSG:4326', 'EPSG:3857');

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      view: new View({
        center: turkeyCenter,
        zoom: 6
      }),
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

    });

   
  }




  show(){
    this.dialogService.openDialog({
      componentType: ListCoordinateDialogComponent,
      data: 1
    })
  }

  async loadPolygonData() {
    try {
      this.polygonData = await this.apiService.readData();
      this.addPolygonsToMap();
    } catch (error) {
      console.error('Error fetching polygon data:', error);
    }
  }

  addPolygonsToMap() {
    const vectorSource = new VectorSource();

    this.polygonData.forEach(item => {
      const coordinates = item.coordinates[0]
      const polygon = new Polygon([coordinates]);
      debugger;
      const feature = new Feature({
        geometry: polygon,
        name: item.name,
        number: item.number
      });
      
      vectorSource.addFeature(feature);
      debugger;
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 0, 0, 0.2)'
        }),
        stroke: new Stroke({
          color: 'red',
          width: 2
        })
      })
    });

    this.map.addLayer(vectorLayer);
  }
  


}
