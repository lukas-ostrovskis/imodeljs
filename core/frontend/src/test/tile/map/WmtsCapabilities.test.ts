/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import { WmtsCapabilities } from "../../../tile/map/WmtsCapabilities";

describe.only("WmtsCapabilities", () => {
  const SMALL_DEGREES_DIFFERENCE = 1.0e-8;

  it("should parse USGS WMTS capabilities", async () => {
    const capabilities = await WmtsCapabilities.create("assets/wmts_capabilities/USGSHydroCached_capabilities.xml");
    expect(capabilities?.version).to.equal("1.0.0");


    // Test GetCapabilities operation metadata
    expect(capabilities?.operationsMetadata?.getCapabilities).to.not.undefined;
    expect(capabilities?.operationsMetadata?.getCapabilities?.name).to.equals("GetCapabilities");
    expect(capabilities?.operationsMetadata?.getCapabilities?.postDcpHttp).to.undefined;
    expect(capabilities?.operationsMetadata?.getCapabilities?.getDcpHttp).to.not.undefined;
    expect(capabilities?.operationsMetadata?.getCapabilities?.getDcpHttp?.length).to.equals(2);
    if (capabilities?.operationsMetadata?.getCapabilities?.getDcpHttp) {
      expect(capabilities.operationsMetadata.getCapabilities.getDcpHttp[0].constraintName).to.equals("GetEncoding");
      expect(capabilities.operationsMetadata.getCapabilities.getDcpHttp[0].encoding).to.equals("RESTful");
      expect(capabilities.operationsMetadata.getCapabilities.getDcpHttp[0].url).to.equals("https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/WMTS/1.0.0/WMTSCapabilities.xml");

      expect(capabilities.operationsMetadata.getCapabilities.getDcpHttp[1].constraintName).to.equals("GetEncoding");
      expect(capabilities.operationsMetadata.getCapabilities.getDcpHttp[1].encoding).to.equals("KVP");
      expect(capabilities.operationsMetadata.getCapabilities.getDcpHttp[1].url).to.equals("https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/WMTS?");
    }


    // Test GetTile operation metadata
    expect(capabilities?.operationsMetadata?.getTile).to.not.undefined;
    expect(capabilities?.operationsMetadata?.getTile?.name).to.equals("GetTile");

    expect(capabilities?.operationsMetadata?.getTile?.postDcpHttp).to.undefined;
    expect(capabilities?.operationsMetadata?.getTile?.getDcpHttp?.length).to.equals(2);
    if (capabilities?.operationsMetadata?.getTile?.getDcpHttp) {
      expect(capabilities.operationsMetadata.getTile.getDcpHttp[0].constraintName).to.equals("GetEncoding");
      expect(capabilities.operationsMetadata.getTile.getDcpHttp[0].encoding).to.equals("RESTful");
      expect(capabilities.operationsMetadata.getTile.getDcpHttp[0].url).to.equals("https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/WMTS/tile/1.0.0/");

      expect(capabilities.operationsMetadata.getTile.getDcpHttp[1].constraintName).to.equals("GetEncoding");
      expect(capabilities.operationsMetadata.getTile.getDcpHttp[1].encoding).to.equals("KVP");
      expect(capabilities.operationsMetadata.getTile.getDcpHttp[1].url).to.equals("https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/WMTS?");
    }


    // Check that no GetFeatureInfo has been configured
    expect(capabilities?.operationsMetadata?.getFeatureInfo).to.undefined;

    //
    // Content
    //
    expect(capabilities?.contents).to.not.undefined;
    expect(capabilities?.contents?.layers.length).to.equal(1);

    // Identifier
    expect(capabilities?.contents?.layers[0].identifier).to.equal("USGSHydroCached");

    // Format
    expect(capabilities?.contents?.layers[0].format).to.equal("image/jpgpng");

    // BoundingBox
    expect(capabilities?.contents?.layers[0].boundingBox).to.not.undefined;
    expect(capabilities?.contents?.layers[0].boundingBox?.crs).to.equal("urn:ogc:def:crs:EPSG::3857");
    expect(capabilities?.contents?.layers[0].boundingBox?.range).to.not.undefined;
    expect(capabilities?.contents?.layers[0].boundingBox?.range?.low.isAlmostEqualXY(-2.003750785759102E7, -3.024245526192411E7));
    expect(capabilities?.contents?.layers[0].boundingBox?.range?.low.isAlmostEqualXY(2.003872561259901E7, 3.0240971955423884E7));


    expect(capabilities?.contents?.layers[0].wsg84BoundingBox).to.not.undefined;

    expect(capabilities?.contents?.layers[0].wsg84BoundingBox?.west).to.not.undefined;
    if (capabilities?.contents?.layers[0].wsg84BoundingBox?.west) {
      const area = capabilities.contents.layers[0].wsg84BoundingBox.globalLocationArea;

      expect(Math.abs(area.southwest.longitudeDegrees - (-179.99999550841463))).to.be.lessThan(SMALL_DEGREES_DIFFERENCE);
      expect(Math.abs(area.southwest.latitudeDegrees - (-88.99999992161116))).to.be.lessThan(SMALL_DEGREES_DIFFERENCE);
      expect(Math.abs(area.northeast.longitudeDegrees - (179.99999550841463))).to.be.lessThan(SMALL_DEGREES_DIFFERENCE);
      expect(Math.abs(area.northeast.latitudeDegrees - (88.99999992161116))).to.be.lessThan(SMALL_DEGREES_DIFFERENCE);
    }

    // Style
    expect(capabilities?.contents?.layers[0].style).to.not.undefined;
    expect(capabilities?.contents?.layers[0].style?.identifier).to.equal("default");
    expect(capabilities?.contents?.layers[0].style?.title).to.equal("Default Style");
    expect(capabilities?.contents?.layers[0].style?.isDefault).to.equal(true);

    // TileMatrixSetLink
    expect(capabilities?.contents?.layers[0].tileMatrixSetLinks.length).to.equal(2);
    expect(capabilities?.contents?.layers[0].tileMatrixSetLinks[0].tileMatrixSet).to.equal("default028mm");
    expect(capabilities?.contents?.layers[0].tileMatrixSetLinks[1].tileMatrixSet).to.equal("GoogleMapsCompatible");

  });

  it("should parse sample OGC WMTS capabilities", async () => {
    const capabilities = await WmtsCapabilities.create("assets/wmts_capabilities/OGCSample_capabilities.xml");

    // Test GetCapabilities operation metadata
    expect(capabilities?.operationsMetadata?.getCapabilities).to.not.undefined;
    expect(capabilities?.operationsMetadata?.getCapabilities?.name).to.equals("GetCapabilities");

    expect(capabilities?.operationsMetadata?.getCapabilities?.getDcpHttp).to.not.undefined;
    expect(capabilities?.operationsMetadata?.getCapabilities?.getDcpHttp?.length).to.equals(1);
    if (capabilities?.operationsMetadata?.getCapabilities?.getDcpHttp) {
      expect(capabilities.operationsMetadata.getCapabilities.getDcpHttp[0].constraintName).to.equals("GetEncoding");
      expect(capabilities.operationsMetadata.getCapabilities.getDcpHttp[0].encoding).to.equals("KVP");
      expect(capabilities.operationsMetadata.getCapabilities.getDcpHttp[0].url).to.equals("http://www.maps.bob/maps.cgi?");
    }

    expect(capabilities?.operationsMetadata?.getCapabilities?.postDcpHttp).to.not.undefined;
    expect(capabilities?.operationsMetadata?.getCapabilities?.postDcpHttp?.length).to.equals(1);
    if (capabilities?.operationsMetadata?.getCapabilities?.postDcpHttp) {
      expect(capabilities.operationsMetadata.getCapabilities.postDcpHttp[0].constraintName).to.equals("PostEncoding");
      expect(capabilities.operationsMetadata.getCapabilities.postDcpHttp[0].encoding).to.equals("SOAP");
      expect(capabilities.operationsMetadata.getCapabilities.postDcpHttp[0].url).to.equals("http://www.maps.bob/maps.cgi?");
    }


    // Test GetTile operation metadata
    expect(capabilities?.operationsMetadata?.getTile).to.not.undefined;
    expect(capabilities?.operationsMetadata?.getTile?.name).to.equals("GetTile");

    expect(capabilities?.operationsMetadata?.getTile?.getDcpHttp).to.not.undefined;
    expect(capabilities?.operationsMetadata?.getTile?.getDcpHttp?.length).to.equals(1);
    if (capabilities?.operationsMetadata?.getTile?.getDcpHttp) {
      expect(capabilities.operationsMetadata.getTile.getDcpHttp[0].constraintName).to.equals("GetEncoding");
      expect(capabilities.operationsMetadata.getTile.getDcpHttp[0].encoding).to.equals("KVP");
      expect(capabilities.operationsMetadata.getTile.getDcpHttp[0].url).to.equals("http://www.maps.bob/maps.cgi?");
    }
    expect(capabilities?.operationsMetadata?.getTile?.postDcpHttp).to.undefined;

    // Test GetFeatureInfo operation metadata
    expect(capabilities?.operationsMetadata?.getFeatureInfo).to.not.undefined;
    expect(capabilities?.operationsMetadata?.getFeatureInfo?.name).to.equals("GetFeatureInfo");

    expect(capabilities?.operationsMetadata?.getFeatureInfo?.getDcpHttp).to.not.undefined;
    expect(capabilities?.operationsMetadata?.getFeatureInfo?.getDcpHttp?.length).to.equals(1);
    if (capabilities?.operationsMetadata?.getFeatureInfo?.getDcpHttp) {
      expect(capabilities.operationsMetadata.getFeatureInfo.getDcpHttp[0].constraintName).to.equals("GetEncoding");
      expect(capabilities.operationsMetadata.getFeatureInfo.getDcpHttp[0].encoding).to.equals("KVP");
      expect(capabilities.operationsMetadata.getFeatureInfo.getDcpHttp[0].url).to.equals("http://www.maps.bob/maps.cgi?");
    }
    expect(capabilities?.operationsMetadata?.getFeatureInfo?.postDcpHttp).to.undefined;


    expect(capabilities?.version).to.equal("1.0.0");
    expect(capabilities?.contents).to.not.undefined;
    expect(capabilities?.contents?.layers.length).to.equal(2);
    expect(capabilities?.contents?.layers[0].identifier).to.equal("etopo2");
    expect(capabilities?.contents?.layers[0].tileMatrixSetLinks.length).to.equal(1);
    expect(capabilities?.contents?.layers[0].tileMatrixSetLinks[0].tileMatrixSet).to.equal("WholeWorld_CRS_84");

    expect(capabilities?.contents?.layers[1].identifier).to.equal("AdminBoundaries");
    expect(capabilities?.contents?.layers[1].tileMatrixSetLinks.length).to.equal(1);
    expect(capabilities?.contents?.layers[1].tileMatrixSetLinks[0].tileMatrixSet).to.equal("WholeWorld_CRS_84");
  });
});