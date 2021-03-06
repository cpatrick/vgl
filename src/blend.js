//////////////////////////////////////////////////////////////////////////////
/**
 * @module ogs.vgl
 */

/*jslint devel: true, forin: true, newcap: true, plusplus: true*/
/*jslint white: true, continue:true, indent: 2*/

/*global vglModule, gl, ogs, vec4, inherit, $*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of clas blendFunction
 *
 * @class
 * @param source
 * @param destination
 * @returns {vglModule.blendFunction}
 */
//////////////////////////////////////////////////////////////////////////////
vglModule.blendFunction = function(source, destination) {
  'use strict';

  if (!(this instanceof vglModule.blendFunction)) {
    return new vglModule.blendFunction(source, destination);
  }

  /** @private */
  var m_source = source,
      m_destination = destination;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Apply blend function to the current state
   *
   * @param {vglModule.renderState}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.apply = function(renderState) {
    gl.blendFuncSeparate(m_source, m_destination, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  };

  return this;
};

////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class blend
 *
 * @returns {vglModule.blend}
 */
////////////////////////////////////////////////////////////////////////////
vglModule.blend = function() {
  'use strict';

  if (!(this instanceof vglModule.blend)) {
    return new vglModule.blend();
  }
  vglModule.materialAttribute.call(
    this, vglModule.materialAttributeType.Blend);

  /** @private */
  var m_wasEnabled = false,
      m_blendFunction = vglModule.blendFunction(gl.SRC_ALPHA,
                                                gl.ONE_MINUS_SRC_ALPHA);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Bind blend attribute
   *
   * @param {vglModule.renderState}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.bind = function(renderState) {
    m_wasEnabled = gl.isEnabled(gl.BLEND);

    if (this.enabled()) {
      gl.enable(gl.BLEND);
      m_blendFunction.apply(renderState);
    }
    else {
      gl.disable(gl.BLEND);
    }

    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Undo bind blend attribute
   *
   * @param {vglModule.renderState}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.undoBind = function(renderState) {
    if (m_wasEnabled) {
      gl.enable(gl.BLEND);
    }
    else {
      gl.disable(gl.BLEND);
    }

    return true;
  };

  return this;
};

inherit(vglModule.blend, vglModule.materialAttribute);
