/* tslint:disable */
/* eslint-disable */
/**
 * Kompello Server API
 * Kompello Server API Documentation
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UserUuidList
 */
export interface UserUuidList {
    /**
     * 
     * @type {Array<string>}
     * @memberof UserUuidList
     */
    uuids: Array<string>;
}

/**
 * Check if a given object implements the UserUuidList interface.
 */
export function instanceOfUserUuidList(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "uuids" in value;

    return isInstance;
}

export function UserUuidListFromJSON(json: any): UserUuidList {
    return UserUuidListFromJSONTyped(json, false);
}

export function UserUuidListFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserUuidList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'uuids': json['uuids'],
    };
}

export function UserUuidListToJSON(value?: UserUuidList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'uuids': value.uuids,
    };
}

