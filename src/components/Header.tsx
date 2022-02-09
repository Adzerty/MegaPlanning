import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonTitle } from "@ionic/react"
import { reload } from "ionicons/icons"

export const Header : React.FC =  ({children}) => {
	return (
	<IonHeader>
		<IonToolbar>
			<IonButtons slot="start">
				<IonMenuButton />
				<IonButton onClick={() => { window.location.reload() }}>
				<IonIcon icon={reload}></IonIcon>
				</IonButton>
			</IonButtons>
			<IonTitle>{children}</IonTitle>
		</IonToolbar>
	</IonHeader>
	)
}