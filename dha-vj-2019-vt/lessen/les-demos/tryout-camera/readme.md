Zie 'Code/tryout-camera-2'

1. Instructies gevolgd op https://ionicframework.com/docs/native/camera/
2. Ivm foutmelding op no developer account (zei screenshots):
3. In XCode in algemeeen (zonder project te openen) een developer account ingesteld bij 'Preferences...'
4. En in het project zelf in XCode (workspace file geopend van MyApp) ook developer team ingesteld met provisioning account e.d. (device moest gekoppeld, maar hoefde gelukkig NIET meer via developer portal)
5. Ivm issue 'Unable to locate Developer Disk Image.' oid ook een symbolic link gemaakt zoals beschreven in dit GitHub issue: (ik weet niet of dit hielp)
https://github.com/phonegap/ios-deploy/issues/171#issuecomment-140471523
6. En ook iPhone (6S) geherstart

It works!