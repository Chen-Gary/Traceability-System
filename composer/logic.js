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
