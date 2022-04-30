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
