# expo-gps-status-listener

## Introduction

`expo-gps-status-listener` est un module Expo qui permet d'écouter les changements d'état du GPS sur un appareil mobile.

## Installation

Ajoutez ce package à votre projet Expo avec la commande suivante :

```sh
expo install expo-gps-status-listener
```

## Utilisation

Importez le module et commencez à écouter les changements de statut du GPS :

```typescript
import { useEffect } from "react";
import { ExpoGpsStatusListener } from "expo-gps-status-listener";

const [isGPSEnabled, setIsGPSEnabled] = useState(false);

useEffect(() => {
	const subscription = ExpoGpsStatusListener.addGPSStatusListener((event) => {
		console.log("GPS status changed:", event.isEnabled);
		setIsGPSEnabled(event.isEnabled);
	});

	return () => {
		subscription.remove();
	};
}, []);
```

## API

### `addGPSStatusListener(callback: (status: boolean) => void): Subscription`

Ajoute un écouteur pour les changements de statut du GPS.

- `callback`: Fonction appelée avec `true` si le GPS est activé, `false` sinon.
- Retourne un objet `Subscription` permettant de gérer l'écouteur.

### `removeGPSStatusListener(subscription: Subscription): void`

Supprime un écouteur de statut GPS.

## Compatibilité

- ✅ Android
- ❌ iOS (Actuellement non supporté)

## Licence

MIT
