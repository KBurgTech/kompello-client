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
 * @interface Register
 */
export interface Register {
    /**
     * 
     * @type {string}
     * @memberof Register
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof Register
     */
    password: string;
    /**
     * 
     * @type {string}
     * @memberof Register
     */
    passwordRepeated: string;
    /**
     * 
     * @type {string}
     * @memberof Register
     */
    firstName: string;
    /**
     * 
     * @type {string}
     * @memberof Register
     */
    lastName: string;
}

/**
 * Check if a given object implements the Register interface.
 */
export function instanceOfRegister(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "password" in value;
    isInstance = isInstance && "passwordRepeated" in value;
    isInstance = isInstance && "firstName" in value;
    isInstance = isInstance && "lastName" in value;

    return isInstance;
}

export function RegisterFromJSON(json: any): Register {
    return RegisterFromJSONTyped(json, false);
}

export function RegisterFromJSONTyped(json: any, ignoreDiscriminator: boolean): Register {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'password': json['password'],
        'passwordRepeated': json['password_repeated'],
        'firstName': json['first_name'],
        'lastName': json['last_name'],
    };
}

export function RegisterToJSON(value?: Register | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'password': value.password,
        'password_repeated': value.passwordRepeated,
        'first_name': value.firstName,
        'last_name': value.lastName,
    };
}
