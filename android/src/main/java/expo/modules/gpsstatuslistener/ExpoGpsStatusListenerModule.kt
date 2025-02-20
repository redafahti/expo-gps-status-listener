package expo.modules.gpsstatuslistener

import android.content.Context
import android.location.LocationManager
import android.content.BroadcastReceiver
import android.content.Intent
import android.content.IntentFilter
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoGpsStatusListenerModule : Module() {

    private val context: Context
        get() = appContext.reactContext ?: throw Exception("React context not found")
    
    private val locationManager by lazy {
        context.getSystemService(Context.LOCATION_SERVICE) as LocationManager
    }

    private val gpsReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            if (intent?.action == LocationManager.PROVIDERS_CHANGED_ACTION) {
                sendGPSStatusEvent()
            }
        }
    }

    override fun definition() = ModuleDefinition {
 
        Name("ExpoGpsStatusListener")

        OnCreate {
            val filter = IntentFilter(LocationManager.PROVIDERS_CHANGED_ACTION)
            context.registerReceiver(gpsReceiver, filter)
        }

        OnDestroy {
            context.unregisterReceiver(gpsReceiver)
        }

        Function("isGPSEnabled") {
            locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)
        }

        Events("onGPSStatusChange")
    }

    private fun sendGPSStatusEvent() {
        val isEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)
        sendEvent("onGPSStatusChange", mapOf(
            "isEnabled" to isEnabled
        ))
    }
}
