import { IonGrid, IonRow, IonLabel, IonSkeletonText, IonCol, IonContent } from "@ionic/react"
import events from "events"
import { Devoir } from "./Devoirs"
import './DevoirGrid.css';
import { GridElement } from "../../components/GridElement";

function sortByDtstart(o: any, o2: any) {
  let dateO = Date.parse(o.date.toString());
  let dateO2 = Date.parse(o2.date.toString());
  return dateO - dateO2;
}

export const DevoirGrid : React.FC<{ isLoading : boolean, devoirs : Devoir[] }> =  ({isLoading,devoirs}) =>{
	return (
		<div className="eventLaterContainer" >
		{devoirs.sort(sortByDtstart).map((devoir) =>
		  <IonGrid className="eventLater">
			<GridElement name="Intitulé :" value={devoir.title} isLoading={isLoading}/>
			<GridElement name="Date de rendu :" value={new Date(devoir.date.toString()).toLocaleString("fr-FR", { weekday: 'long' }) + " " + new Date(devoir.date.toString().slice(0,19)).toLocaleString()} isLoading={isLoading}/>
			<GridElement name="Tags :" value={devoir.tags} isLoading={isLoading}/>
		  </IonGrid>
		)}
	  </div>
	)
}