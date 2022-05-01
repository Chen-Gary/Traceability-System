/**
 * Create raw material. New raw material instance is added in and traced by this system.
 * This transaction is performed by materialSupplier.
 * @param {org.traceabilitysystem.Create} create
 * @transaction
 */

async function createNewRawMaterial(create) {
    let assetRegistry = await getAssetRegistry('org.traceabilitysystem.RawMaterial');

    // Get the factory for creating new asset instances
    var factory = getFactory();

    // Create the rawMaterial
    var rawMaterial = factory.newResource('org.traceabilitysystem', 'RawMaterial', create.batchID);
    
    rawMaterial.materialType = create.materialType;
    rawMaterial.description = create.description;
    rawMaterial.quality = create.quality;
    rawMaterial.creationDate = create.creationDate;
    rawMaterial.owner = create.creator;

    // Add the rawMaterial to asset registry
    await assetRegistry.add(rawMaterial);
}


/**
 * Convert: raw material to battery.
 * New battery instance is created, basing on raw materials.
 * @param {org.traceabilitysystem.Convert_rawMaterial2battery} convert_rawMaterial2battery
 * @transaction
 */

async function convertRawMaterial2battery(convert_rawMaterial2battery) {
    let assetRegistry = await getAssetRegistry('org.traceabilitysystem.Battery');

    var factory = getFactory();

    var battery = factory.newResource('org.traceabilitysystem', 'Battery', convert_rawMaterial2battery.batchID);

    battery.model = convert_rawMaterial2battery.model;
    battery.quality = convert_rawMaterial2battery.quality;
    battery.creationDate = convert_rawMaterial2battery.creationDate;
    battery.rawMaterialBatchID = convert_rawMaterial2battery.rawMaterialBatchID;
    battery.owner = convert_rawMaterial2battery.owner;

    await assetRegistry.add(battery);
}


/**
 * Convert: battery to eletric tool.
 * New EletricTool instance is created, basing on Battery(s).
 * @param {org.traceabilitysystem.Convert_battery2eletricTool} convert_battery2eletricTool
 * @transaction
 */

async function convertBattery2eletricTool(convert_battery2eletricTool) {
    let assetRegistry = await getAssetRegistry('org.traceabilitysystem.EletricTool');

    var factory = getFactory();

    var eletricTool = factory.newResource('org.traceabilitysystem', 'EletricTool', convert_battery2eletricTool.batchID);

    eletricTool.type = convert_battery2eletricTool.type;
    eletricTool.quality = convert_battery2eletricTool.quality;
    eletricTool.creationDate = convert_battery2eletricTool.creationDate;
    eletricTool.batteryBatchID = convert_battery2eletricTool.batteryBatchID;
    eletricTool.owners = [];
    eletricTool.owners.push( convert_battery2eletricTool.owner );

    await assetRegistry.add(eletricTool);
}




//--------------------------------------------------------------------
/**
 * Test query
 * @param {org.traceabilitysystem.QueryTest} queryTest
 * @transaction
 */
async function myQueryTest(queryTest) {
    var q = buildQuery('SELECT org.traceabilitysystem.Battery WHERE (batchID == _$inputValue)');

    console.log("[DEBUG] queryTest.battery = " + queryTest.battery.getIdentifier());
    
    return query(q, { inputValue: queryTest.battery.getIdentifier() })
    .then(function (assets) {
        assets.forEach(function (asset) {
            console.log(JSON.stringify(asset));
        });
    })
    .catch(function (error) {
        // Add optional error handling here.
    });
}
