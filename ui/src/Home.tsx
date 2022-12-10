import {useCallback, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import confetti from "canvas-confetti";
import Countdown from "react-countdown";
import {Snackbar, Paper, LinearProgress, Chip, Button} from "@material-ui/core";
import BN from 'bn.js'
import React from 'react'
import Alert from "@material-ui/lab/Alert";
import { MetaMaskInpageProvider } from "@metamask/providers";
import Slider from '@material-ui/core/Slider';

import {AlertState, getAtaForMint, toDate} from './utils';
import {MintButton} from './MintButton';
import { ethers } from "ethers";

import { initializeAlchemy, getNftsForOwner, getNftsForCollection, Network } from '@alch/alchemy-sdk';

export const CTAButton = styled(Button)`
  display: inline !important;
  margin: 0 auto !important;
  background-color: var(--title-text-color) !important;
  min-width: 120px !important;
  font-size: 1em !important;
`;
 // using default settings - pass in a settings object to specify your API key and network

const gameAbi = {
	"deploy": {
		"VM:-": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"main:1": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"ropsten:3": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"rinkeby:4": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"kovan:42": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"goerli:5": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"Custom": {
			"linkReferences": {},
			"autoDeployLib": true
		}
	},
	"data": {
		"bytecode": {
			"functionDebugData": {
				"@_3998": {
					"entryPoint": null,
					"id": 3998,
					"parameterSlots": 4,
					"returnSlots": 0
				},
				"abi_decode_address_fromMemory": {
					"entryPoint": 495,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_decode_tuple_t_uint256t_addresst_addresst_address_fromMemory": {
					"entryPoint": 524,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 4
				},
				"array_dataslot_string_storage": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"checked_add_t_uint256": {
					"entryPoint": 608,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"clean_up_bytearray_end_slots_string_storage": {
					"entryPoint": 730,
					"id": null,
					"parameterSlots": 3,
					"returnSlots": 0
				},
				"copy_byte_array_to_storage_from_t_string_memory_ptr_to_t_string_storage": {
					"entryPoint": 813,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 0
				},
				"extract_byte_array_length": {
					"entryPoint": 670,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"extract_used_part_and_set_length_of_short_byte_array": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"panic_error_0x41": {
					"entryPoint": 648,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				}
			},
			"generatedSources": [
				{
					"ast": {
						"nodeType": "YulBlock",
						"src": "0:3586:19",
						"statements": [
							{
								"nodeType": "YulBlock",
								"src": "6:3:19",
								"statements": []
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "74:117:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "84:22:19",
											"value": {
												"arguments": [
													{
														"name": "offset",
														"nodeType": "YulIdentifier",
														"src": "99:6:19"
													}
												],
												"functionName": {
													"name": "mload",
													"nodeType": "YulIdentifier",
													"src": "93:5:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "93:13:19"
											},
											"variableNames": [
												{
													"name": "value",
													"nodeType": "YulIdentifier",
													"src": "84:5:19"
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "169:16:19",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "178:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "181:1:19",
																	"type": "",
																	"value": "0"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "171:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "171:12:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "171:12:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "128:5:19"
															},
															{
																"arguments": [
																	{
																		"name": "value",
																		"nodeType": "YulIdentifier",
																		"src": "139:5:19"
																	},
																	{
																		"arguments": [
																			{
																				"arguments": [
																					{
																						"kind": "number",
																						"nodeType": "YulLiteral",
																						"src": "154:3:19",
																						"type": "",
																						"value": "160"
																					},
																					{
																						"kind": "number",
																						"nodeType": "YulLiteral",
																						"src": "159:1:19",
																						"type": "",
																						"value": "1"
																					}
																				],
																				"functionName": {
																					"name": "shl",
																					"nodeType": "YulIdentifier",
																					"src": "150:3:19"
																				},
																				"nodeType": "YulFunctionCall",
																				"src": "150:11:19"
																			},
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "163:1:19",
																				"type": "",
																				"value": "1"
																			}
																		],
																		"functionName": {
																			"name": "sub",
																			"nodeType": "YulIdentifier",
																			"src": "146:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "146:19:19"
																	}
																],
																"functionName": {
																	"name": "and",
																	"nodeType": "YulIdentifier",
																	"src": "135:3:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "135:31:19"
															}
														],
														"functionName": {
															"name": "eq",
															"nodeType": "YulIdentifier",
															"src": "125:2:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "125:42:19"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "118:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "118:50:19"
											},
											"nodeType": "YulIf",
											"src": "115:70:19"
										}
									]
								},
								"name": "abi_decode_address_fromMemory",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "offset",
										"nodeType": "YulTypedName",
										"src": "53:6:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "64:5:19",
										"type": ""
									}
								],
								"src": "14:177:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "328:308:19",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "375:16:19",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "384:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "387:1:19",
																	"type": "",
																	"value": "0"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "377:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "377:12:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "377:12:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "349:7:19"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "358:9:19"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "345:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "345:23:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "370:3:19",
														"type": "",
														"value": "128"
													}
												],
												"functionName": {
													"name": "slt",
													"nodeType": "YulIdentifier",
													"src": "341:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "341:33:19"
											},
											"nodeType": "YulIf",
											"src": "338:53:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "400:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "416:9:19"
													}
												],
												"functionName": {
													"name": "mload",
													"nodeType": "YulIdentifier",
													"src": "410:5:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "410:16:19"
											},
											"variableNames": [
												{
													"name": "value0",
													"nodeType": "YulIdentifier",
													"src": "400:6:19"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "435:59:19",
											"value": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "479:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "490:2:19",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "475:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "475:18:19"
													}
												],
												"functionName": {
													"name": "abi_decode_address_fromMemory",
													"nodeType": "YulIdentifier",
													"src": "445:29:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "445:49:19"
											},
											"variableNames": [
												{
													"name": "value1",
													"nodeType": "YulIdentifier",
													"src": "435:6:19"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "503:59:19",
											"value": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "547:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "558:2:19",
																"type": "",
																"value": "64"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "543:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "543:18:19"
													}
												],
												"functionName": {
													"name": "abi_decode_address_fromMemory",
													"nodeType": "YulIdentifier",
													"src": "513:29:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "513:49:19"
											},
											"variableNames": [
												{
													"name": "value2",
													"nodeType": "YulIdentifier",
													"src": "503:6:19"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "571:59:19",
											"value": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "615:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "626:2:19",
																"type": "",
																"value": "96"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "611:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "611:18:19"
													}
												],
												"functionName": {
													"name": "abi_decode_address_fromMemory",
													"nodeType": "YulIdentifier",
													"src": "581:29:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "581:49:19"
											},
											"variableNames": [
												{
													"name": "value3",
													"nodeType": "YulIdentifier",
													"src": "571:6:19"
												}
											]
										}
									]
								},
								"name": "abi_decode_tuple_t_uint256t_addresst_addresst_address_fromMemory",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "270:9:19",
										"type": ""
									},
									{
										"name": "dataEnd",
										"nodeType": "YulTypedName",
										"src": "281:7:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "293:6:19",
										"type": ""
									},
									{
										"name": "value1",
										"nodeType": "YulTypedName",
										"src": "301:6:19",
										"type": ""
									},
									{
										"name": "value2",
										"nodeType": "YulTypedName",
										"src": "309:6:19",
										"type": ""
									},
									{
										"name": "value3",
										"nodeType": "YulTypedName",
										"src": "317:6:19",
										"type": ""
									}
								],
								"src": "196:440:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "689:174:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "699:16:19",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "710:1:19"
													},
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "713:1:19"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "706:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "706:9:19"
											},
											"variableNames": [
												{
													"name": "sum",
													"nodeType": "YulIdentifier",
													"src": "699:3:19"
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "746:111:19",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "767:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"arguments": [
																		{
																			"kind": "number",
																			"nodeType": "YulLiteral",
																			"src": "774:3:19",
																			"type": "",
																			"value": "224"
																		},
																		{
																			"kind": "number",
																			"nodeType": "YulLiteral",
																			"src": "779:10:19",
																			"type": "",
																			"value": "0x4e487b71"
																		}
																	],
																	"functionName": {
																		"name": "shl",
																		"nodeType": "YulIdentifier",
																		"src": "770:3:19"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "770:20:19"
																}
															],
															"functionName": {
																"name": "mstore",
																"nodeType": "YulIdentifier",
																"src": "760:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "760:31:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "760:31:19"
													},
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "811:1:19",
																	"type": "",
																	"value": "4"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "814:4:19",
																	"type": "",
																	"value": "0x11"
																}
															],
															"functionName": {
																"name": "mstore",
																"nodeType": "YulIdentifier",
																"src": "804:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "804:15:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "804:15:19"
													},
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "839:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "842:4:19",
																	"type": "",
																	"value": "0x24"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "832:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "832:15:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "832:15:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "730:1:19"
													},
													{
														"name": "sum",
														"nodeType": "YulIdentifier",
														"src": "733:3:19"
													}
												],
												"functionName": {
													"name": "gt",
													"nodeType": "YulIdentifier",
													"src": "727:2:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "727:10:19"
											},
											"nodeType": "YulIf",
											"src": "724:133:19"
										}
									]
								},
								"name": "checked_add_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "x",
										"nodeType": "YulTypedName",
										"src": "672:1:19",
										"type": ""
									},
									{
										"name": "y",
										"nodeType": "YulTypedName",
										"src": "675:1:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "sum",
										"nodeType": "YulTypedName",
										"src": "681:3:19",
										"type": ""
									}
								],
								"src": "641:222:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "900:95:19",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "917:1:19",
														"type": "",
														"value": "0"
													},
													{
														"arguments": [
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "924:3:19",
																"type": "",
																"value": "224"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "929:10:19",
																"type": "",
																"value": "0x4e487b71"
															}
														],
														"functionName": {
															"name": "shl",
															"nodeType": "YulIdentifier",
															"src": "920:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "920:20:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "910:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "910:31:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "910:31:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "957:1:19",
														"type": "",
														"value": "4"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "960:4:19",
														"type": "",
														"value": "0x41"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "950:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "950:15:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "950:15:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "981:1:19",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "984:4:19",
														"type": "",
														"value": "0x24"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "974:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "974:15:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "974:15:19"
										}
									]
								},
								"name": "panic_error_0x41",
								"nodeType": "YulFunctionDefinition",
								"src": "868:127:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1055:325:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "1065:22:19",
											"value": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1079:1:19",
														"type": "",
														"value": "1"
													},
													{
														"name": "data",
														"nodeType": "YulIdentifier",
														"src": "1082:4:19"
													}
												],
												"functionName": {
													"name": "shr",
													"nodeType": "YulIdentifier",
													"src": "1075:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1075:12:19"
											},
											"variableNames": [
												{
													"name": "length",
													"nodeType": "YulIdentifier",
													"src": "1065:6:19"
												}
											]
										},
										{
											"nodeType": "YulVariableDeclaration",
											"src": "1096:38:19",
											"value": {
												"arguments": [
													{
														"name": "data",
														"nodeType": "YulIdentifier",
														"src": "1126:4:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1132:1:19",
														"type": "",
														"value": "1"
													}
												],
												"functionName": {
													"name": "and",
													"nodeType": "YulIdentifier",
													"src": "1122:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1122:12:19"
											},
											"variables": [
												{
													"name": "outOfPlaceEncoding",
													"nodeType": "YulTypedName",
													"src": "1100:18:19",
													"type": ""
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "1173:31:19",
												"statements": [
													{
														"nodeType": "YulAssignment",
														"src": "1175:27:19",
														"value": {
															"arguments": [
																{
																	"name": "length",
																	"nodeType": "YulIdentifier",
																	"src": "1189:6:19"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "1197:4:19",
																	"type": "",
																	"value": "0x7f"
																}
															],
															"functionName": {
																"name": "and",
																"nodeType": "YulIdentifier",
																"src": "1185:3:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "1185:17:19"
														},
														"variableNames": [
															{
																"name": "length",
																"nodeType": "YulIdentifier",
																"src": "1175:6:19"
															}
														]
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "outOfPlaceEncoding",
														"nodeType": "YulIdentifier",
														"src": "1153:18:19"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "1146:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1146:26:19"
											},
											"nodeType": "YulIf",
											"src": "1143:61:19"
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "1263:111:19",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "1284:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"arguments": [
																		{
																			"kind": "number",
																			"nodeType": "YulLiteral",
																			"src": "1291:3:19",
																			"type": "",
																			"value": "224"
																		},
																		{
																			"kind": "number",
																			"nodeType": "YulLiteral",
																			"src": "1296:10:19",
																			"type": "",
																			"value": "0x4e487b71"
																		}
																	],
																	"functionName": {
																		"name": "shl",
																		"nodeType": "YulIdentifier",
																		"src": "1287:3:19"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "1287:20:19"
																}
															],
															"functionName": {
																"name": "mstore",
																"nodeType": "YulIdentifier",
																"src": "1277:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "1277:31:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "1277:31:19"
													},
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "1328:1:19",
																	"type": "",
																	"value": "4"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "1331:4:19",
																	"type": "",
																	"value": "0x22"
																}
															],
															"functionName": {
																"name": "mstore",
																"nodeType": "YulIdentifier",
																"src": "1321:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "1321:15:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "1321:15:19"
													},
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "1356:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "1359:4:19",
																	"type": "",
																	"value": "0x24"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "1349:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "1349:15:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "1349:15:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "outOfPlaceEncoding",
														"nodeType": "YulIdentifier",
														"src": "1219:18:19"
													},
													{
														"arguments": [
															{
																"name": "length",
																"nodeType": "YulIdentifier",
																"src": "1242:6:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "1250:2:19",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "lt",
															"nodeType": "YulIdentifier",
															"src": "1239:2:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "1239:14:19"
													}
												],
												"functionName": {
													"name": "eq",
													"nodeType": "YulIdentifier",
													"src": "1216:2:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1216:38:19"
											},
											"nodeType": "YulIf",
											"src": "1213:161:19"
										}
									]
								},
								"name": "extract_byte_array_length",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "data",
										"nodeType": "YulTypedName",
										"src": "1035:4:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "length",
										"nodeType": "YulTypedName",
										"src": "1044:6:19",
										"type": ""
									}
								],
								"src": "1000:380:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1441:65:19",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1458:1:19",
														"type": "",
														"value": "0"
													},
													{
														"name": "ptr",
														"nodeType": "YulIdentifier",
														"src": "1461:3:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "1451:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1451:14:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "1451:14:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "1474:26:19",
											"value": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1492:1:19",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1495:4:19",
														"type": "",
														"value": "0x20"
													}
												],
												"functionName": {
													"name": "keccak256",
													"nodeType": "YulIdentifier",
													"src": "1482:9:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1482:18:19"
											},
											"variableNames": [
												{
													"name": "data",
													"nodeType": "YulIdentifier",
													"src": "1474:4:19"
												}
											]
										}
									]
								},
								"name": "array_dataslot_string_storage",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "ptr",
										"nodeType": "YulTypedName",
										"src": "1424:3:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "data",
										"nodeType": "YulTypedName",
										"src": "1432:4:19",
										"type": ""
									}
								],
								"src": "1385:121:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1592:464:19",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "1625:425:19",
												"statements": [
													{
														"nodeType": "YulVariableDeclaration",
														"src": "1639:11:19",
														"value": {
															"kind": "number",
															"nodeType": "YulLiteral",
															"src": "1649:1:19",
															"type": "",
															"value": "0"
														},
														"variables": [
															{
																"name": "_1",
																"nodeType": "YulTypedName",
																"src": "1643:2:19",
																"type": ""
															}
														]
													},
													{
														"expression": {
															"arguments": [
																{
																	"name": "_1",
																	"nodeType": "YulIdentifier",
																	"src": "1670:2:19"
																},
																{
																	"name": "array",
																	"nodeType": "YulIdentifier",
																	"src": "1674:5:19"
																}
															],
															"functionName": {
																"name": "mstore",
																"nodeType": "YulIdentifier",
																"src": "1663:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "1663:17:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "1663:17:19"
													},
													{
														"nodeType": "YulVariableDeclaration",
														"src": "1693:31:19",
														"value": {
															"arguments": [
																{
																	"name": "_1",
																	"nodeType": "YulIdentifier",
																	"src": "1715:2:19"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "1719:4:19",
																	"type": "",
																	"value": "0x20"
																}
															],
															"functionName": {
																"name": "keccak256",
																"nodeType": "YulIdentifier",
																"src": "1705:9:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "1705:19:19"
														},
														"variables": [
															{
																"name": "data",
																"nodeType": "YulTypedName",
																"src": "1697:4:19",
																"type": ""
															}
														]
													},
													{
														"nodeType": "YulVariableDeclaration",
														"src": "1737:57:19",
														"value": {
															"arguments": [
																{
																	"name": "data",
																	"nodeType": "YulIdentifier",
																	"src": "1760:4:19"
																},
																{
																	"arguments": [
																		{
																			"kind": "number",
																			"nodeType": "YulLiteral",
																			"src": "1770:1:19",
																			"type": "",
																			"value": "5"
																		},
																		{
																			"arguments": [
																				{
																					"name": "startIndex",
																					"nodeType": "YulIdentifier",
																					"src": "1777:10:19"
																				},
																				{
																					"kind": "number",
																					"nodeType": "YulLiteral",
																					"src": "1789:2:19",
																					"type": "",
																					"value": "31"
																				}
																			],
																			"functionName": {
																				"name": "add",
																				"nodeType": "YulIdentifier",
																				"src": "1773:3:19"
																			},
																			"nodeType": "YulFunctionCall",
																			"src": "1773:19:19"
																		}
																	],
																	"functionName": {
																		"name": "shr",
																		"nodeType": "YulIdentifier",
																		"src": "1766:3:19"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "1766:27:19"
																}
															],
															"functionName": {
																"name": "add",
																"nodeType": "YulIdentifier",
																"src": "1756:3:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "1756:38:19"
														},
														"variables": [
															{
																"name": "deleteStart",
																"nodeType": "YulTypedName",
																"src": "1741:11:19",
																"type": ""
															}
														]
													},
													{
														"body": {
															"nodeType": "YulBlock",
															"src": "1831:23:19",
															"statements": [
																{
																	"nodeType": "YulAssignment",
																	"src": "1833:19:19",
																	"value": {
																		"name": "data",
																		"nodeType": "YulIdentifier",
																		"src": "1848:4:19"
																	},
																	"variableNames": [
																		{
																			"name": "deleteStart",
																			"nodeType": "YulIdentifier",
																			"src": "1833:11:19"
																		}
																	]
																}
															]
														},
														"condition": {
															"arguments": [
																{
																	"name": "startIndex",
																	"nodeType": "YulIdentifier",
																	"src": "1813:10:19"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "1825:4:19",
																	"type": "",
																	"value": "0x20"
																}
															],
															"functionName": {
																"name": "lt",
																"nodeType": "YulIdentifier",
																"src": "1810:2:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "1810:20:19"
														},
														"nodeType": "YulIf",
														"src": "1807:47:19"
													},
													{
														"nodeType": "YulVariableDeclaration",
														"src": "1867:41:19",
														"value": {
															"arguments": [
																{
																	"name": "data",
																	"nodeType": "YulIdentifier",
																	"src": "1881:4:19"
																},
																{
																	"arguments": [
																		{
																			"kind": "number",
																			"nodeType": "YulLiteral",
																			"src": "1891:1:19",
																			"type": "",
																			"value": "5"
																		},
																		{
																			"arguments": [
																				{
																					"name": "len",
																					"nodeType": "YulIdentifier",
																					"src": "1898:3:19"
																				},
																				{
																					"kind": "number",
																					"nodeType": "YulLiteral",
																					"src": "1903:2:19",
																					"type": "",
																					"value": "31"
																				}
																			],
																			"functionName": {
																				"name": "add",
																				"nodeType": "YulIdentifier",
																				"src": "1894:3:19"
																			},
																			"nodeType": "YulFunctionCall",
																			"src": "1894:12:19"
																		}
																	],
																	"functionName": {
																		"name": "shr",
																		"nodeType": "YulIdentifier",
																		"src": "1887:3:19"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "1887:20:19"
																}
															],
															"functionName": {
																"name": "add",
																"nodeType": "YulIdentifier",
																"src": "1877:3:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "1877:31:19"
														},
														"variables": [
															{
																"name": "_2",
																"nodeType": "YulTypedName",
																"src": "1871:2:19",
																"type": ""
															}
														]
													},
													{
														"nodeType": "YulVariableDeclaration",
														"src": "1921:24:19",
														"value": {
															"name": "deleteStart",
															"nodeType": "YulIdentifier",
															"src": "1934:11:19"
														},
														"variables": [
															{
																"name": "start",
																"nodeType": "YulTypedName",
																"src": "1925:5:19",
																"type": ""
															}
														]
													},
													{
														"body": {
															"nodeType": "YulBlock",
															"src": "2019:21:19",
															"statements": [
																{
																	"expression": {
																		"arguments": [
																			{
																				"name": "start",
																				"nodeType": "YulIdentifier",
																				"src": "2028:5:19"
																			},
																			{
																				"name": "_1",
																				"nodeType": "YulIdentifier",
																				"src": "2035:2:19"
																			}
																		],
																		"functionName": {
																			"name": "sstore",
																			"nodeType": "YulIdentifier",
																			"src": "2021:6:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "2021:17:19"
																	},
																	"nodeType": "YulExpressionStatement",
																	"src": "2021:17:19"
																}
															]
														},
														"condition": {
															"arguments": [
																{
																	"name": "start",
																	"nodeType": "YulIdentifier",
																	"src": "1969:5:19"
																},
																{
																	"name": "_2",
																	"nodeType": "YulIdentifier",
																	"src": "1976:2:19"
																}
															],
															"functionName": {
																"name": "lt",
																"nodeType": "YulIdentifier",
																"src": "1966:2:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "1966:13:19"
														},
														"nodeType": "YulForLoop",
														"post": {
															"nodeType": "YulBlock",
															"src": "1980:26:19",
															"statements": [
																{
																	"nodeType": "YulAssignment",
																	"src": "1982:22:19",
																	"value": {
																		"arguments": [
																			{
																				"name": "start",
																				"nodeType": "YulIdentifier",
																				"src": "1995:5:19"
																			},
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "2002:1:19",
																				"type": "",
																				"value": "1"
																			}
																		],
																		"functionName": {
																			"name": "add",
																			"nodeType": "YulIdentifier",
																			"src": "1991:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "1991:13:19"
																	},
																	"variableNames": [
																		{
																			"name": "start",
																			"nodeType": "YulIdentifier",
																			"src": "1982:5:19"
																		}
																	]
																}
															]
														},
														"pre": {
															"nodeType": "YulBlock",
															"src": "1962:3:19",
															"statements": []
														},
														"src": "1958:82:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "len",
														"nodeType": "YulIdentifier",
														"src": "1608:3:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1613:2:19",
														"type": "",
														"value": "31"
													}
												],
												"functionName": {
													"name": "gt",
													"nodeType": "YulIdentifier",
													"src": "1605:2:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1605:11:19"
											},
											"nodeType": "YulIf",
											"src": "1602:448:19"
										}
									]
								},
								"name": "clean_up_bytearray_end_slots_string_storage",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "array",
										"nodeType": "YulTypedName",
										"src": "1564:5:19",
										"type": ""
									},
									{
										"name": "len",
										"nodeType": "YulTypedName",
										"src": "1571:3:19",
										"type": ""
									},
									{
										"name": "startIndex",
										"nodeType": "YulTypedName",
										"src": "1576:10:19",
										"type": ""
									}
								],
								"src": "1511:545:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2146:81:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "2156:65:19",
											"value": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "data",
																"nodeType": "YulIdentifier",
																"src": "2171:4:19"
															},
															{
																"arguments": [
																	{
																		"arguments": [
																			{
																				"arguments": [
																					{
																						"kind": "number",
																						"nodeType": "YulLiteral",
																						"src": "2189:1:19",
																						"type": "",
																						"value": "3"
																					},
																					{
																						"name": "len",
																						"nodeType": "YulIdentifier",
																						"src": "2192:3:19"
																					}
																				],
																				"functionName": {
																					"name": "shl",
																					"nodeType": "YulIdentifier",
																					"src": "2185:3:19"
																				},
																				"nodeType": "YulFunctionCall",
																				"src": "2185:11:19"
																			},
																			{
																				"arguments": [
																					{
																						"kind": "number",
																						"nodeType": "YulLiteral",
																						"src": "2202:1:19",
																						"type": "",
																						"value": "0"
																					}
																				],
																				"functionName": {
																					"name": "not",
																					"nodeType": "YulIdentifier",
																					"src": "2198:3:19"
																				},
																				"nodeType": "YulFunctionCall",
																				"src": "2198:6:19"
																			}
																		],
																		"functionName": {
																			"name": "shr",
																			"nodeType": "YulIdentifier",
																			"src": "2181:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "2181:24:19"
																	}
																],
																"functionName": {
																	"name": "not",
																	"nodeType": "YulIdentifier",
																	"src": "2177:3:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "2177:29:19"
															}
														],
														"functionName": {
															"name": "and",
															"nodeType": "YulIdentifier",
															"src": "2167:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "2167:40:19"
													},
													{
														"arguments": [
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "2213:1:19",
																"type": "",
																"value": "1"
															},
															{
																"name": "len",
																"nodeType": "YulIdentifier",
																"src": "2216:3:19"
															}
														],
														"functionName": {
															"name": "shl",
															"nodeType": "YulIdentifier",
															"src": "2209:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "2209:11:19"
													}
												],
												"functionName": {
													"name": "or",
													"nodeType": "YulIdentifier",
													"src": "2164:2:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "2164:57:19"
											},
											"variableNames": [
												{
													"name": "used",
													"nodeType": "YulIdentifier",
													"src": "2156:4:19"
												}
											]
										}
									]
								},
								"name": "extract_used_part_and_set_length_of_short_byte_array",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "data",
										"nodeType": "YulTypedName",
										"src": "2123:4:19",
										"type": ""
									},
									{
										"name": "len",
										"nodeType": "YulTypedName",
										"src": "2129:3:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "used",
										"nodeType": "YulTypedName",
										"src": "2137:4:19",
										"type": ""
									}
								],
								"src": "2061:166:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2328:1256:19",
									"statements": [
										{
											"nodeType": "YulVariableDeclaration",
											"src": "2338:24:19",
											"value": {
												"arguments": [
													{
														"name": "src",
														"nodeType": "YulIdentifier",
														"src": "2358:3:19"
													}
												],
												"functionName": {
													"name": "mload",
													"nodeType": "YulIdentifier",
													"src": "2352:5:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "2352:10:19"
											},
											"variables": [
												{
													"name": "newLen",
													"nodeType": "YulTypedName",
													"src": "2342:6:19",
													"type": ""
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "2405:22:19",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x41",
																"nodeType": "YulIdentifier",
																"src": "2407:16:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "2407:18:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "2407:18:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "newLen",
														"nodeType": "YulIdentifier",
														"src": "2377:6:19"
													},
													{
														"arguments": [
															{
																"arguments": [
																	{
																		"kind": "number",
																		"nodeType": "YulLiteral",
																		"src": "2393:2:19",
																		"type": "",
																		"value": "64"
																	},
																	{
																		"kind": "number",
																		"nodeType": "YulLiteral",
																		"src": "2397:1:19",
																		"type": "",
																		"value": "1"
																	}
																],
																"functionName": {
																	"name": "shl",
																	"nodeType": "YulIdentifier",
																	"src": "2389:3:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "2389:10:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "2401:1:19",
																"type": "",
																"value": "1"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "2385:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "2385:18:19"
													}
												],
												"functionName": {
													"name": "gt",
													"nodeType": "YulIdentifier",
													"src": "2374:2:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "2374:30:19"
											},
											"nodeType": "YulIf",
											"src": "2371:56:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "slot",
														"nodeType": "YulIdentifier",
														"src": "2480:4:19"
													},
													{
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "slot",
																		"nodeType": "YulIdentifier",
																		"src": "2518:4:19"
																	}
																],
																"functionName": {
																	"name": "sload",
																	"nodeType": "YulIdentifier",
																	"src": "2512:5:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "2512:11:19"
															}
														],
														"functionName": {
															"name": "extract_byte_array_length",
															"nodeType": "YulIdentifier",
															"src": "2486:25:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "2486:38:19"
													},
													{
														"name": "newLen",
														"nodeType": "YulIdentifier",
														"src": "2526:6:19"
													}
												],
												"functionName": {
													"name": "clean_up_bytearray_end_slots_string_storage",
													"nodeType": "YulIdentifier",
													"src": "2436:43:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "2436:97:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "2436:97:19"
										},
										{
											"nodeType": "YulVariableDeclaration",
											"src": "2542:18:19",
											"value": {
												"kind": "number",
												"nodeType": "YulLiteral",
												"src": "2559:1:19",
												"type": "",
												"value": "0"
											},
											"variables": [
												{
													"name": "srcOffset",
													"nodeType": "YulTypedName",
													"src": "2546:9:19",
													"type": ""
												}
											]
										},
										{
											"nodeType": "YulVariableDeclaration",
											"src": "2569:23:19",
											"value": {
												"kind": "number",
												"nodeType": "YulLiteral",
												"src": "2588:4:19",
												"type": "",
												"value": "0x20"
											},
											"variables": [
												{
													"name": "srcOffset_1",
													"nodeType": "YulTypedName",
													"src": "2573:11:19",
													"type": ""
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "2601:24:19",
											"value": {
												"name": "srcOffset_1",
												"nodeType": "YulIdentifier",
												"src": "2614:11:19"
											},
											"variableNames": [
												{
													"name": "srcOffset",
													"nodeType": "YulIdentifier",
													"src": "2601:9:19"
												}
											]
										},
										{
											"cases": [
												{
													"body": {
														"nodeType": "YulBlock",
														"src": "2671:656:19",
														"statements": [
															{
																"nodeType": "YulVariableDeclaration",
																"src": "2685:35:19",
																"value": {
																	"arguments": [
																		{
																			"name": "newLen",
																			"nodeType": "YulIdentifier",
																			"src": "2704:6:19"
																		},
																		{
																			"arguments": [
																				{
																					"kind": "number",
																					"nodeType": "YulLiteral",
																					"src": "2716:2:19",
																					"type": "",
																					"value": "31"
																				}
																			],
																			"functionName": {
																				"name": "not",
																				"nodeType": "YulIdentifier",
																				"src": "2712:3:19"
																			},
																			"nodeType": "YulFunctionCall",
																			"src": "2712:7:19"
																		}
																	],
																	"functionName": {
																		"name": "and",
																		"nodeType": "YulIdentifier",
																		"src": "2700:3:19"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "2700:20:19"
																},
																"variables": [
																	{
																		"name": "loopEnd",
																		"nodeType": "YulTypedName",
																		"src": "2689:7:19",
																		"type": ""
																	}
																]
															},
															{
																"nodeType": "YulVariableDeclaration",
																"src": "2733:49:19",
																"value": {
																	"arguments": [
																		{
																			"name": "slot",
																			"nodeType": "YulIdentifier",
																			"src": "2777:4:19"
																		}
																	],
																	"functionName": {
																		"name": "array_dataslot_string_storage",
																		"nodeType": "YulIdentifier",
																		"src": "2747:29:19"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "2747:35:19"
																},
																"variables": [
																	{
																		"name": "dstPtr",
																		"nodeType": "YulTypedName",
																		"src": "2737:6:19",
																		"type": ""
																	}
																]
															},
															{
																"nodeType": "YulVariableDeclaration",
																"src": "2795:10:19",
																"value": {
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "2804:1:19",
																	"type": "",
																	"value": "0"
																},
																"variables": [
																	{
																		"name": "i",
																		"nodeType": "YulTypedName",
																		"src": "2799:1:19",
																		"type": ""
																	}
																]
															},
															{
																"body": {
																	"nodeType": "YulBlock",
																	"src": "2882:172:19",
																	"statements": [
																		{
																			"expression": {
																				"arguments": [
																					{
																						"name": "dstPtr",
																						"nodeType": "YulIdentifier",
																						"src": "2907:6:19"
																					},
																					{
																						"arguments": [
																							{
																								"arguments": [
																									{
																										"name": "src",
																										"nodeType": "YulIdentifier",
																										"src": "2925:3:19"
																									},
																									{
																										"name": "srcOffset",
																										"nodeType": "YulIdentifier",
																										"src": "2930:9:19"
																									}
																								],
																								"functionName": {
																									"name": "add",
																									"nodeType": "YulIdentifier",
																									"src": "2921:3:19"
																								},
																								"nodeType": "YulFunctionCall",
																								"src": "2921:19:19"
																							}
																						],
																						"functionName": {
																							"name": "mload",
																							"nodeType": "YulIdentifier",
																							"src": "2915:5:19"
																						},
																						"nodeType": "YulFunctionCall",
																						"src": "2915:26:19"
																					}
																				],
																				"functionName": {
																					"name": "sstore",
																					"nodeType": "YulIdentifier",
																					"src": "2900:6:19"
																				},
																				"nodeType": "YulFunctionCall",
																				"src": "2900:42:19"
																			},
																			"nodeType": "YulExpressionStatement",
																			"src": "2900:42:19"
																		},
																		{
																			"nodeType": "YulAssignment",
																			"src": "2959:24:19",
																			"value": {
																				"arguments": [
																					{
																						"name": "dstPtr",
																						"nodeType": "YulIdentifier",
																						"src": "2973:6:19"
																					},
																					{
																						"kind": "number",
																						"nodeType": "YulLiteral",
																						"src": "2981:1:19",
																						"type": "",
																						"value": "1"
																					}
																				],
																				"functionName": {
																					"name": "add",
																					"nodeType": "YulIdentifier",
																					"src": "2969:3:19"
																				},
																				"nodeType": "YulFunctionCall",
																				"src": "2969:14:19"
																			},
																			"variableNames": [
																				{
																					"name": "dstPtr",
																					"nodeType": "YulIdentifier",
																					"src": "2959:6:19"
																				}
																			]
																		},
																		{
																			"nodeType": "YulAssignment",
																			"src": "3000:40:19",
																			"value": {
																				"arguments": [
																					{
																						"name": "srcOffset",
																						"nodeType": "YulIdentifier",
																						"src": "3017:9:19"
																					},
																					{
																						"name": "srcOffset_1",
																						"nodeType": "YulIdentifier",
																						"src": "3028:11:19"
																					}
																				],
																				"functionName": {
																					"name": "add",
																					"nodeType": "YulIdentifier",
																					"src": "3013:3:19"
																				},
																				"nodeType": "YulFunctionCall",
																				"src": "3013:27:19"
																			},
																			"variableNames": [
																				{
																					"name": "srcOffset",
																					"nodeType": "YulIdentifier",
																					"src": "3000:9:19"
																				}
																			]
																		}
																	]
																},
																"condition": {
																	"arguments": [
																		{
																			"name": "i",
																			"nodeType": "YulIdentifier",
																			"src": "2829:1:19"
																		},
																		{
																			"name": "loopEnd",
																			"nodeType": "YulIdentifier",
																			"src": "2832:7:19"
																		}
																	],
																	"functionName": {
																		"name": "lt",
																		"nodeType": "YulIdentifier",
																		"src": "2826:2:19"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "2826:14:19"
																},
																"nodeType": "YulForLoop",
																"post": {
																	"nodeType": "YulBlock",
																	"src": "2841:28:19",
																	"statements": [
																		{
																			"nodeType": "YulAssignment",
																			"src": "2843:24:19",
																			"value": {
																				"arguments": [
																					{
																						"name": "i",
																						"nodeType": "YulIdentifier",
																						"src": "2852:1:19"
																					},
																					{
																						"name": "srcOffset_1",
																						"nodeType": "YulIdentifier",
																						"src": "2855:11:19"
																					}
																				],
																				"functionName": {
																					"name": "add",
																					"nodeType": "YulIdentifier",
																					"src": "2848:3:19"
																				},
																				"nodeType": "YulFunctionCall",
																				"src": "2848:19:19"
																			},
																			"variableNames": [
																				{
																					"name": "i",
																					"nodeType": "YulIdentifier",
																					"src": "2843:1:19"
																				}
																			]
																		}
																	]
																},
																"pre": {
																	"nodeType": "YulBlock",
																	"src": "2822:3:19",
																	"statements": []
																},
																"src": "2818:236:19"
															},
															{
																"body": {
																	"nodeType": "YulBlock",
																	"src": "3102:166:19",
																	"statements": [
																		{
																			"nodeType": "YulVariableDeclaration",
																			"src": "3120:43:19",
																			"value": {
																				"arguments": [
																					{
																						"arguments": [
																							{
																								"name": "src",
																								"nodeType": "YulIdentifier",
																								"src": "3147:3:19"
																							},
																							{
																								"name": "srcOffset",
																								"nodeType": "YulIdentifier",
																								"src": "3152:9:19"
																							}
																						],
																						"functionName": {
																							"name": "add",
																							"nodeType": "YulIdentifier",
																							"src": "3143:3:19"
																						},
																						"nodeType": "YulFunctionCall",
																						"src": "3143:19:19"
																					}
																				],
																				"functionName": {
																					"name": "mload",
																					"nodeType": "YulIdentifier",
																					"src": "3137:5:19"
																				},
																				"nodeType": "YulFunctionCall",
																				"src": "3137:26:19"
																			},
																			"variables": [
																				{
																					"name": "lastValue",
																					"nodeType": "YulTypedName",
																					"src": "3124:9:19",
																					"type": ""
																				}
																			]
																		},
																		{
																			"expression": {
																				"arguments": [
																					{
																						"name": "dstPtr",
																						"nodeType": "YulIdentifier",
																						"src": "3187:6:19"
																					},
																					{
																						"arguments": [
																							{
																								"name": "lastValue",
																								"nodeType": "YulIdentifier",
																								"src": "3199:9:19"
																							},
																							{
																								"arguments": [
																									{
																										"arguments": [
																											{
																												"arguments": [
																													{
																														"arguments": [
																															{
																																"kind": "number",
																																"nodeType": "YulLiteral",
																																"src": "3226:1:19",
																																"type": "",
																																"value": "3"
																															},
																															{
																																"name": "newLen",
																																"nodeType": "YulIdentifier",
																																"src": "3229:6:19"
																															}
																														],
																														"functionName": {
																															"name": "shl",
																															"nodeType": "YulIdentifier",
																															"src": "3222:3:19"
																														},
																														"nodeType": "YulFunctionCall",
																														"src": "3222:14:19"
																													},
																													{
																														"kind": "number",
																														"nodeType": "YulLiteral",
																														"src": "3238:3:19",
																														"type": "",
																														"value": "248"
																													}
																												],
																												"functionName": {
																													"name": "and",
																													"nodeType": "YulIdentifier",
																													"src": "3218:3:19"
																												},
																												"nodeType": "YulFunctionCall",
																												"src": "3218:24:19"
																											},
																											{
																												"arguments": [
																													{
																														"kind": "number",
																														"nodeType": "YulLiteral",
																														"src": "3248:1:19",
																														"type": "",
																														"value": "0"
																													}
																												],
																												"functionName": {
																													"name": "not",
																													"nodeType": "YulIdentifier",
																													"src": "3244:3:19"
																												},
																												"nodeType": "YulFunctionCall",
																												"src": "3244:6:19"
																											}
																										],
																										"functionName": {
																											"name": "shr",
																											"nodeType": "YulIdentifier",
																											"src": "3214:3:19"
																										},
																										"nodeType": "YulFunctionCall",
																										"src": "3214:37:19"
																									}
																								],
																								"functionName": {
																									"name": "not",
																									"nodeType": "YulIdentifier",
																									"src": "3210:3:19"
																								},
																								"nodeType": "YulFunctionCall",
																								"src": "3210:42:19"
																							}
																						],
																						"functionName": {
																							"name": "and",
																							"nodeType": "YulIdentifier",
																							"src": "3195:3:19"
																						},
																						"nodeType": "YulFunctionCall",
																						"src": "3195:58:19"
																					}
																				],
																				"functionName": {
																					"name": "sstore",
																					"nodeType": "YulIdentifier",
																					"src": "3180:6:19"
																				},
																				"nodeType": "YulFunctionCall",
																				"src": "3180:74:19"
																			},
																			"nodeType": "YulExpressionStatement",
																			"src": "3180:74:19"
																		}
																	]
																},
																"condition": {
																	"arguments": [
																		{
																			"name": "loopEnd",
																			"nodeType": "YulIdentifier",
																			"src": "3073:7:19"
																		},
																		{
																			"name": "newLen",
																			"nodeType": "YulIdentifier",
																			"src": "3082:6:19"
																		}
																	],
																	"functionName": {
																		"name": "lt",
																		"nodeType": "YulIdentifier",
																		"src": "3070:2:19"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "3070:19:19"
																},
																"nodeType": "YulIf",
																"src": "3067:201:19"
															},
															{
																"expression": {
																	"arguments": [
																		{
																			"name": "slot",
																			"nodeType": "YulIdentifier",
																			"src": "3288:4:19"
																		},
																		{
																			"arguments": [
																				{
																					"arguments": [
																						{
																							"kind": "number",
																							"nodeType": "YulLiteral",
																							"src": "3302:1:19",
																							"type": "",
																							"value": "1"
																						},
																						{
																							"name": "newLen",
																							"nodeType": "YulIdentifier",
																							"src": "3305:6:19"
																						}
																					],
																					"functionName": {
																						"name": "shl",
																						"nodeType": "YulIdentifier",
																						"src": "3298:3:19"
																					},
																					"nodeType": "YulFunctionCall",
																					"src": "3298:14:19"
																				},
																				{
																					"kind": "number",
																					"nodeType": "YulLiteral",
																					"src": "3314:1:19",
																					"type": "",
																					"value": "1"
																				}
																			],
																			"functionName": {
																				"name": "add",
																				"nodeType": "YulIdentifier",
																				"src": "3294:3:19"
																			},
																			"nodeType": "YulFunctionCall",
																			"src": "3294:22:19"
																		}
																	],
																	"functionName": {
																		"name": "sstore",
																		"nodeType": "YulIdentifier",
																		"src": "3281:6:19"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "3281:36:19"
																},
																"nodeType": "YulExpressionStatement",
																"src": "3281:36:19"
															}
														]
													},
													"nodeType": "YulCase",
													"src": "2664:663:19",
													"value": {
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "2669:1:19",
														"type": "",
														"value": "1"
													}
												},
												{
													"body": {
														"nodeType": "YulBlock",
														"src": "3344:234:19",
														"statements": [
															{
																"nodeType": "YulVariableDeclaration",
																"src": "3358:14:19",
																"value": {
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "3371:1:19",
																	"type": "",
																	"value": "0"
																},
																"variables": [
																	{
																		"name": "value",
																		"nodeType": "YulTypedName",
																		"src": "3362:5:19",
																		"type": ""
																	}
																]
															},
															{
																"body": {
																	"nodeType": "YulBlock",
																	"src": "3407:67:19",
																	"statements": [
																		{
																			"nodeType": "YulAssignment",
																			"src": "3425:35:19",
																			"value": {
																				"arguments": [
																					{
																						"arguments": [
																							{
																								"name": "src",
																								"nodeType": "YulIdentifier",
																								"src": "3444:3:19"
																							},
																							{
																								"name": "srcOffset",
																								"nodeType": "YulIdentifier",
																								"src": "3449:9:19"
																							}
																						],
																						"functionName": {
																							"name": "add",
																							"nodeType": "YulIdentifier",
																							"src": "3440:3:19"
																						},
																						"nodeType": "YulFunctionCall",
																						"src": "3440:19:19"
																					}
																				],
																				"functionName": {
																					"name": "mload",
																					"nodeType": "YulIdentifier",
																					"src": "3434:5:19"
																				},
																				"nodeType": "YulFunctionCall",
																				"src": "3434:26:19"
																			},
																			"variableNames": [
																				{
																					"name": "value",
																					"nodeType": "YulIdentifier",
																					"src": "3425:5:19"
																				}
																			]
																		}
																	]
																},
																"condition": {
																	"name": "newLen",
																	"nodeType": "YulIdentifier",
																	"src": "3388:6:19"
																},
																"nodeType": "YulIf",
																"src": "3385:89:19"
															},
															{
																"expression": {
																	"arguments": [
																		{
																			"name": "slot",
																			"nodeType": "YulIdentifier",
																			"src": "3494:4:19"
																		},
																		{
																			"arguments": [
																				{
																					"name": "value",
																					"nodeType": "YulIdentifier",
																					"src": "3553:5:19"
																				},
																				{
																					"name": "newLen",
																					"nodeType": "YulIdentifier",
																					"src": "3560:6:19"
																				}
																			],
																			"functionName": {
																				"name": "extract_used_part_and_set_length_of_short_byte_array",
																				"nodeType": "YulIdentifier",
																				"src": "3500:52:19"
																			},
																			"nodeType": "YulFunctionCall",
																			"src": "3500:67:19"
																		}
																	],
																	"functionName": {
																		"name": "sstore",
																		"nodeType": "YulIdentifier",
																		"src": "3487:6:19"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "3487:81:19"
																},
																"nodeType": "YulExpressionStatement",
																"src": "3487:81:19"
															}
														]
													},
													"nodeType": "YulCase",
													"src": "3336:242:19",
													"value": "default"
												}
											],
											"expression": {
												"arguments": [
													{
														"name": "newLen",
														"nodeType": "YulIdentifier",
														"src": "2644:6:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "2652:2:19",
														"type": "",
														"value": "31"
													}
												],
												"functionName": {
													"name": "gt",
													"nodeType": "YulIdentifier",
													"src": "2641:2:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "2641:14:19"
											},
											"nodeType": "YulSwitch",
											"src": "2634:944:19"
										}
									]
								},
								"name": "copy_byte_array_to_storage_from_t_string_memory_ptr_to_t_string_storage",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "slot",
										"nodeType": "YulTypedName",
										"src": "2313:4:19",
										"type": ""
									},
									{
										"name": "src",
										"nodeType": "YulTypedName",
										"src": "2319:3:19",
										"type": ""
									}
								],
								"src": "2232:1352:19"
							}
						]
					},
					"contents": "{\n    { }\n    function abi_decode_address_fromMemory(offset) -> value\n    {\n        value := mload(offset)\n        if iszero(eq(value, and(value, sub(shl(160, 1), 1)))) { revert(0, 0) }\n    }\n    function abi_decode_tuple_t_uint256t_addresst_addresst_address_fromMemory(headStart, dataEnd) -> value0, value1, value2, value3\n    {\n        if slt(sub(dataEnd, headStart), 128) { revert(0, 0) }\n        value0 := mload(headStart)\n        value1 := abi_decode_address_fromMemory(add(headStart, 32))\n        value2 := abi_decode_address_fromMemory(add(headStart, 64))\n        value3 := abi_decode_address_fromMemory(add(headStart, 96))\n    }\n    function checked_add_t_uint256(x, y) -> sum\n    {\n        sum := add(x, y)\n        if gt(x, sum)\n        {\n            mstore(0, shl(224, 0x4e487b71))\n            mstore(4, 0x11)\n            revert(0, 0x24)\n        }\n    }\n    function panic_error_0x41()\n    {\n        mstore(0, shl(224, 0x4e487b71))\n        mstore(4, 0x41)\n        revert(0, 0x24)\n    }\n    function extract_byte_array_length(data) -> length\n    {\n        length := shr(1, data)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) { length := and(length, 0x7f) }\n        if eq(outOfPlaceEncoding, lt(length, 32))\n        {\n            mstore(0, shl(224, 0x4e487b71))\n            mstore(4, 0x22)\n            revert(0, 0x24)\n        }\n    }\n    function array_dataslot_string_storage(ptr) -> data\n    {\n        mstore(0, ptr)\n        data := keccak256(0, 0x20)\n    }\n    function clean_up_bytearray_end_slots_string_storage(array, len, startIndex)\n    {\n        if gt(len, 31)\n        {\n            let _1 := 0\n            mstore(_1, array)\n            let data := keccak256(_1, 0x20)\n            let deleteStart := add(data, shr(5, add(startIndex, 31)))\n            if lt(startIndex, 0x20) { deleteStart := data }\n            let _2 := add(data, shr(5, add(len, 31)))\n            let start := deleteStart\n            for { } lt(start, _2) { start := add(start, 1) }\n            { sstore(start, _1) }\n        }\n    }\n    function extract_used_part_and_set_length_of_short_byte_array(data, len) -> used\n    {\n        used := or(and(data, not(shr(shl(3, len), not(0)))), shl(1, len))\n    }\n    function copy_byte_array_to_storage_from_t_string_memory_ptr_to_t_string_storage(slot, src)\n    {\n        let newLen := mload(src)\n        if gt(newLen, sub(shl(64, 1), 1)) { panic_error_0x41() }\n        clean_up_bytearray_end_slots_string_storage(slot, extract_byte_array_length(sload(slot)), newLen)\n        let srcOffset := 0\n        let srcOffset_1 := 0x20\n        srcOffset := srcOffset_1\n        switch gt(newLen, 31)\n        case 1 {\n            let loopEnd := and(newLen, not(31))\n            let dstPtr := array_dataslot_string_storage(slot)\n            let i := 0\n            for { } lt(i, loopEnd) { i := add(i, srcOffset_1) }\n            {\n                sstore(dstPtr, mload(add(src, srcOffset)))\n                dstPtr := add(dstPtr, 1)\n                srcOffset := add(srcOffset, srcOffset_1)\n            }\n            if lt(loopEnd, newLen)\n            {\n                let lastValue := mload(add(src, srcOffset))\n                sstore(dstPtr, and(lastValue, not(shr(and(shl(3, newLen), 248), not(0)))))\n            }\n            sstore(slot, add(shl(1, newLen), 1))\n        }\n        default {\n            let value := 0\n            if newLen\n            {\n                value := mload(add(src, srcOffset))\n            }\n            sstore(slot, extract_used_part_and_set_length_of_short_byte_array(value, newLen))\n        }\n    }\n}",
					"id": 19,
					"language": "Yul",
					"name": "#utility.yul"
				}
			],
			"linkReferences": {},
			"object": "6004610100818152637065706560e01b610120526080908152610140828152636b696e6760e01b6101605260a05261018082815263189d5b1b60e21b6101a05260c0526102006040526101c0828152633132b0b960e11b6101e05260e0526200006c916008919062000118565b503480156200007a57600080fd5b5060405162001406380380620014068339810160408190526200009d916200020c565b60008490556006849055600580546001600160a01b038086166001600160a01b03199283161790925560098054858416908316179055600a80549284169282169290921790915560038054821633908117909155600480549092161790556200010a426201518062000260565b60025550620003f992505050565b82805482825590600052602060002090810192821562000163579160200282015b828111156200016357825182906200015290826200032d565b509160200191906001019062000139565b506200017192915062000175565b5090565b80821115620001715760006200018c828262000196565b5060010162000175565b508054620001a4906200029e565b6000825580601f10620001b5575050565b601f016020900490600052602060002090810190620001d59190620001d8565b50565b5b80821115620001715760008155600101620001d9565b80516001600160a01b03811681146200020757600080fd5b919050565b600080600080608085870312156200022357600080fd5b845193506200023560208601620001ef565b92506200024560408601620001ef565b91506200025560608601620001ef565b905092959194509250565b808201808211156200028257634e487b7160e01b600052601160045260246000fd5b92915050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620002b357607f821691505b602082108103620002d457634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200032857600081815260208120601f850160051c81016020861015620003035750805b601f850160051c820191505b8181101562000324578281556001016200030f565b5050505b505050565b81516001600160401b0381111562000349576200034962000288565b62000361816200035a84546200029e565b84620002da565b602080601f831160018114620003995760008415620003805750858301515b600019600386901b1c1916600185901b17855562000324565b600085815260208120601f198616915b82811015620003ca57888601518255948401946001909101908401620003a9565b5085821015620003e95787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610ffd80620004096000396000f3fe6080604052600436106100fe5760003560e01c806388c9cb3c11610095578063b390c0ab11610064578063b390c0ab1461027b578063b9425dad1461029b578063c7876ea4146102bb578063d4114afb146102d1578063dfbf53ae146102e657600080fd5b806388c9cb3c1461021c5780638da5cb5b146102325780639d40a1af14610252578063a035b1fe1461026557600080fd5b80634ba2363a116100d15780634ba2363a146101af5780635b1687b0146101d35780635d7ceb12146101e657806371722f0a1461020657600080fd5b806335633b19146101035780633697615f146101255780633943380c146101625780633ed2b77a14610182575b600080fd5b34801561010f57600080fd5b5061012361011e366004610ded565b610306565b005b34801561013157600080fd5b50600954610145906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561016e57600080fd5b50600554610145906001600160a01b031681565b34801561018e57600080fd5b506101a261019d366004610e41565b610393565b6040516101599190610e5a565b3480156101bb57600080fd5b506101c560015481565b604051908152602001610159565b6101236101e1366004610ea8565b61043f565b3480156101f257600080fd5b50600a54610145906001600160a01b031681565b34801561021257600080fd5b506101c560075481565b34801561022857600080fd5b506101c560025481565b34801561023e57600080fd5b50600354610145906001600160a01b031681565b610123610260366004610ea8565b610796565b34801561027157600080fd5b506101c560005481565b34801561028757600080fd5b50610123610296366004610ea8565b610ad0565b3480156102a757600080fd5b50600b54610145906001600160a01b031681565b3480156102c757600080fd5b506101c560065481565b3480156102dd57600080fd5b50610123610ba9565b3480156102f257600080fd5b50600454610145906001600160a01b031681565b73791f1cfb231e7c75eee4b7f8913e3c2b3548eb9333146103535760405162461bcd60e51b81526020600482015260026024820152616e6f60f01b60448201526064015b60405180910390fd5b600980546001600160a01b039485166001600160a01b031991821617909155600a805493851693821693909317909255600b805491909316911617905550565b600881815481106103a357600080fd5b9060005260206000200160009150905080546103be90610eca565b80601f01602080910402602001604051908101604052809291908181526020018280546103ea90610eca565b80156104375780601f1061040c57610100808354040283529160200191610437565b820191906000526020600020905b81548152906001019060200180831161041a57829003601f168201915b505050505081565b60008211801561045b57506c7e37be2022c0914b268000000082105b6104945760405162461bcd60e51b815260206004820152600a60248201526962616420647265616d7360b01b604482015260640161034a565b600b5460405163ae10426560e01b8152600481018490526001600160a01b039091169063ae10426590602401602060405180830381865afa1580156104dd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105019190610f04565b60008190553410156105445760405162461bcd60e51b815260206004820152600c60248201526b18d85b89dd081859999bdc9960a21b604482015260640161034a565b600081118015610555575060048111155b61058b5760405162461bcd60e51b81526020600482015260076024820152666261647465616d60c81b604482015260640161034a565b600080826001036105a1575060059050806105d8565b826002036105b45750600f9050806105d8565b826003036105c85750601e905060056105d8565b826004036105d8575060059050601e5b6009546001600160a01b0316826105f0606434610f33565b6105fa9190610f55565b604051615e4a91906000818181858888f193505050503d806000811461063c576040519150601f19603f3d011682016040523d82523d6000602084013e610641565b606091505b5050600a546001600160a01b031690508161065d606434610f33565b6106679190610f55565b604051615e4a91906000818181858888f193505050503d80600081146106a9576040519150601f19603f3d011682016040523d82523d6000602084013e6106ae565b606091505b50506003546001600160a01b031690506106c9606434610f33565b604051615e4a91906000818181858888f193505050503d806000811461070b576040519150601f19603f3d011682016040523d82523d6000602084013e610710565b606091505b5050600b54604051630ab714fb60e11b815233600482015260248101879052604481018690526001600160a01b03909116915063156e29f6906064016020604051808303816000875af115801561076b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061078f9190610f72565b5050505050565b6000821180156107a857506103e88211155b6107e15760405162461bcd60e51b815260206004820152600a60248201526962616420647265616d7360b01b604482015260640161034a565b60008054905b8381101561081a5760646107fc836065610f55565b6108069190610f33565b91508061081281610f9b565b9150506107e7565b508034101561082857600080fd5b6064610835826065610f55565b61083f9190610f33565b60005561084d606434610f33565b61085890604e610f55565b600160008282546108699190610fb4565b9091555050811580159061087e575060048211155b6108b45760405162461bcd60e51b81526020600482015260076024820152666261647465616d60c81b604482015260640161034a565b600080836001036108ca57506005905080610901565b836002036108dd5750600f905080610901565b836003036108f15750601e90506005610901565b83600403610901575060059050601e5b6009546001600160a01b031682610919606434610f33565b6109239190610f55565b604051615e4a91906000818181858888f193505050503d8060008114610965576040519150601f19603f3d011682016040523d82523d6000602084013e61096a565b606091505b5050600a546001600160a01b0316905081610986606434610f33565b6109909190610f55565b604051615e4a91906000818181858888f193505050503d80600081146109d2576040519150601f19603f3d011682016040523d82523d6000602084013e6109d7565b606091505b50506003546001600160a01b031690506109f2606434610f33565b604051615e4a91906000818181858888f193505050503d8060008114610a34576040519150601f19603f3d011682016040523d82523d6000602084013e610a39565b606091505b50505060005b85811015610ac857600554604051630797d90960e51b81523360048201526001600160a01b039091169063f2fb2120906024016020604051808303816000875af1158015610a91573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ab59190610f04565b5080610ac081610f9b565b915050610a3f565b505050505050565b600081118015610ae1575060048111155b610b185760405162461bcd60e51b8152602060048201526008602482015267626164207465616d60c01b604482015260640161034a565b6007819055600554604051632770a7eb60e21b8152336004820152602481018490526001600160a01b0390911690639dc29fac90604401600060405180830381600087803b158015610b6957600080fd5b505af1158015610b7d573d6000803e3d6000fd5b505050504262015180610b909190610fb4565b6002555050600480546001600160a01b03191633179055565b600254421015610bee5760405162461bcd60e51b815260206004820152601060248201526f3737ba103a34b6b2903830b230bbb0b760811b604482015260640161034a565b6000806000600754600103610c0c5750603c9150600a905080610c54565b600754600203610c245750601e915081905080610c54565b600754600303610c3e575060149150603c9050600a610c54565b600754600403610c54575060149150600a9050603c5b6004546001600160a01b031683610c6c606447610f33565b610c769190610f55565b604051615e4a91906000818181858888f193505050503d8060008114610cb8576040519150601f19603f3d011682016040523d82523d6000602084013e610cbd565b606091505b50506009546001600160a01b0316905082610cd9606447610f33565b610ce39190610f55565b604051615e4a91906000818181858888f193505050503d8060008114610d25576040519150601f19603f3d011682016040523d82523d6000602084013e610d2a565b606091505b5050600a546001600160a01b0316905081610d46606447610f33565b610d509190610f55565b604051615e4a91906000818181858888f193505050503d8060008114610d92576040519150601f19603f3d011682016040523d82523d6000602084013e610d97565b606091505b5050600354600480546001600160a01b0319166001600160a01b0390921691909117905550610dc94262015180610fb4565b600255505050565b80356001600160a01b0381168114610de857600080fd5b919050565b60008060008060808587031215610e0357600080fd5b610e0c85610dd1565b9350610e1a60208601610dd1565b9250610e2860408601610dd1565b9150610e3660608601610dd1565b905092959194509250565b600060208284031215610e5357600080fd5b5035919050565b600060208083528351808285015260005b81811015610e8757858101830151858201604001528201610e6b565b506000604082860101526040601f19601f8301168501019250505092915050565b60008060408385031215610ebb57600080fd5b50508035926020909101359150565b600181811c90821680610ede57607f821691505b602082108103610efe57634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215610f1657600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b600082610f5057634e487b7160e01b600052601260045260246000fd5b500490565b8082028115828204841417610f6c57610f6c610f1d565b92915050565b600060208284031215610f8457600080fd5b81518015158114610f9457600080fd5b9392505050565b600060018201610fad57610fad610f1d565b5060010190565b80820180821115610f6c57610f6c610f1d56fea2646970667358221220d638bc2e9924432cbd557a8216b1c0ad961b8181de749a7a5598d7a903c01a5964736f6c63430008110033",
			"opcodes": "PUSH1 0x4 PUSH2 0x100 DUP2 DUP2 MSTORE PUSH4 0x70657065 PUSH1 0xE0 SHL PUSH2 0x120 MSTORE PUSH1 0x80 SWAP1 DUP2 MSTORE PUSH2 0x140 DUP3 DUP2 MSTORE PUSH4 0x6B696E67 PUSH1 0xE0 SHL PUSH2 0x160 MSTORE PUSH1 0xA0 MSTORE PUSH2 0x180 DUP3 DUP2 MSTORE PUSH4 0x189D5B1B PUSH1 0xE2 SHL PUSH2 0x1A0 MSTORE PUSH1 0xC0 MSTORE PUSH2 0x200 PUSH1 0x40 MSTORE PUSH2 0x1C0 DUP3 DUP2 MSTORE PUSH4 0x3132B0B9 PUSH1 0xE1 SHL PUSH2 0x1E0 MSTORE PUSH1 0xE0 MSTORE PUSH3 0x6C SWAP2 PUSH1 0x8 SWAP2 SWAP1 PUSH3 0x118 JUMP JUMPDEST POP CALLVALUE DUP1 ISZERO PUSH3 0x7A JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD PUSH3 0x1406 CODESIZE SUB DUP1 PUSH3 0x1406 DUP4 CODECOPY DUP2 ADD PUSH1 0x40 DUP2 SWAP1 MSTORE PUSH3 0x9D SWAP2 PUSH3 0x20C JUMP JUMPDEST PUSH1 0x0 DUP5 SWAP1 SSTORE PUSH1 0x6 DUP5 SWAP1 SSTORE PUSH1 0x5 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP1 DUP7 AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT SWAP3 DUP4 AND OR SWAP1 SWAP3 SSTORE PUSH1 0x9 DUP1 SLOAD DUP6 DUP5 AND SWAP1 DUP4 AND OR SWAP1 SSTORE PUSH1 0xA DUP1 SLOAD SWAP3 DUP5 AND SWAP3 DUP3 AND SWAP3 SWAP1 SWAP3 OR SWAP1 SWAP2 SSTORE PUSH1 0x3 DUP1 SLOAD DUP3 AND CALLER SWAP1 DUP2 OR SWAP1 SWAP2 SSTORE PUSH1 0x4 DUP1 SLOAD SWAP1 SWAP3 AND OR SWAP1 SSTORE PUSH3 0x10A TIMESTAMP PUSH3 0x15180 PUSH3 0x260 JUMP JUMPDEST PUSH1 0x2 SSTORE POP PUSH3 0x3F9 SWAP3 POP POP POP JUMP JUMPDEST DUP3 DUP1 SLOAD DUP3 DUP3 SSTORE SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 DUP2 ADD SWAP3 DUP3 ISZERO PUSH3 0x163 JUMPI SWAP2 PUSH1 0x20 MUL DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH3 0x163 JUMPI DUP3 MLOAD DUP3 SWAP1 PUSH3 0x152 SWAP1 DUP3 PUSH3 0x32D JUMP JUMPDEST POP SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH3 0x139 JUMP JUMPDEST POP PUSH3 0x171 SWAP3 SWAP2 POP PUSH3 0x175 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST DUP1 DUP3 GT ISZERO PUSH3 0x171 JUMPI PUSH1 0x0 PUSH3 0x18C DUP3 DUP3 PUSH3 0x196 JUMP JUMPDEST POP PUSH1 0x1 ADD PUSH3 0x175 JUMP JUMPDEST POP DUP1 SLOAD PUSH3 0x1A4 SWAP1 PUSH3 0x29E JUMP JUMPDEST PUSH1 0x0 DUP3 SSTORE DUP1 PUSH1 0x1F LT PUSH3 0x1B5 JUMPI POP POP JUMP JUMPDEST PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 DUP2 ADD SWAP1 PUSH3 0x1D5 SWAP2 SWAP1 PUSH3 0x1D8 JUMP JUMPDEST POP JUMP JUMPDEST JUMPDEST DUP1 DUP3 GT ISZERO PUSH3 0x171 JUMPI PUSH1 0x0 DUP2 SSTORE PUSH1 0x1 ADD PUSH3 0x1D9 JUMP JUMPDEST DUP1 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 EQ PUSH3 0x207 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP1 PUSH1 0x80 DUP6 DUP8 SUB SLT ISZERO PUSH3 0x223 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP5 MLOAD SWAP4 POP PUSH3 0x235 PUSH1 0x20 DUP7 ADD PUSH3 0x1EF JUMP JUMPDEST SWAP3 POP PUSH3 0x245 PUSH1 0x40 DUP7 ADD PUSH3 0x1EF JUMP JUMPDEST SWAP2 POP PUSH3 0x255 PUSH1 0x60 DUP7 ADD PUSH3 0x1EF JUMP JUMPDEST SWAP1 POP SWAP3 SWAP6 SWAP2 SWAP5 POP SWAP3 POP JUMP JUMPDEST DUP1 DUP3 ADD DUP1 DUP3 GT ISZERO PUSH3 0x282 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x1 DUP2 DUP2 SHR SWAP1 DUP3 AND DUP1 PUSH3 0x2B3 JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 SUB PUSH3 0x2D4 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x1F DUP3 GT ISZERO PUSH3 0x328 JUMPI PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x20 DUP2 KECCAK256 PUSH1 0x1F DUP6 ADD PUSH1 0x5 SHR DUP2 ADD PUSH1 0x20 DUP7 LT ISZERO PUSH3 0x303 JUMPI POP DUP1 JUMPDEST PUSH1 0x1F DUP6 ADD PUSH1 0x5 SHR DUP3 ADD SWAP2 POP JUMPDEST DUP2 DUP2 LT ISZERO PUSH3 0x324 JUMPI DUP3 DUP2 SSTORE PUSH1 0x1 ADD PUSH3 0x30F JUMP JUMPDEST POP POP POP JUMPDEST POP POP POP JUMP JUMPDEST DUP2 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0x40 SHL SUB DUP2 GT ISZERO PUSH3 0x349 JUMPI PUSH3 0x349 PUSH3 0x288 JUMP JUMPDEST PUSH3 0x361 DUP2 PUSH3 0x35A DUP5 SLOAD PUSH3 0x29E JUMP JUMPDEST DUP5 PUSH3 0x2DA JUMP JUMPDEST PUSH1 0x20 DUP1 PUSH1 0x1F DUP4 GT PUSH1 0x1 DUP2 EQ PUSH3 0x399 JUMPI PUSH1 0x0 DUP5 ISZERO PUSH3 0x380 JUMPI POP DUP6 DUP4 ADD MLOAD JUMPDEST PUSH1 0x0 NOT PUSH1 0x3 DUP7 SWAP1 SHL SHR NOT AND PUSH1 0x1 DUP6 SWAP1 SHL OR DUP6 SSTORE PUSH3 0x324 JUMP JUMPDEST PUSH1 0x0 DUP6 DUP2 MSTORE PUSH1 0x20 DUP2 KECCAK256 PUSH1 0x1F NOT DUP7 AND SWAP2 JUMPDEST DUP3 DUP2 LT ISZERO PUSH3 0x3CA JUMPI DUP9 DUP7 ADD MLOAD DUP3 SSTORE SWAP5 DUP5 ADD SWAP5 PUSH1 0x1 SWAP1 SWAP2 ADD SWAP1 DUP5 ADD PUSH3 0x3A9 JUMP JUMPDEST POP DUP6 DUP3 LT ISZERO PUSH3 0x3E9 JUMPI DUP8 DUP6 ADD MLOAD PUSH1 0x0 NOT PUSH1 0x3 DUP9 SWAP1 SHL PUSH1 0xF8 AND SHR NOT AND DUP2 SSTORE JUMPDEST POP POP POP POP POP PUSH1 0x1 SWAP1 DUP2 SHL ADD SWAP1 SSTORE POP JUMP JUMPDEST PUSH2 0xFFD DUP1 PUSH3 0x409 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0xFE JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x88C9CB3C GT PUSH2 0x95 JUMPI DUP1 PUSH4 0xB390C0AB GT PUSH2 0x64 JUMPI DUP1 PUSH4 0xB390C0AB EQ PUSH2 0x27B JUMPI DUP1 PUSH4 0xB9425DAD EQ PUSH2 0x29B JUMPI DUP1 PUSH4 0xC7876EA4 EQ PUSH2 0x2BB JUMPI DUP1 PUSH4 0xD4114AFB EQ PUSH2 0x2D1 JUMPI DUP1 PUSH4 0xDFBF53AE EQ PUSH2 0x2E6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x88C9CB3C EQ PUSH2 0x21C JUMPI DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0x232 JUMPI DUP1 PUSH4 0x9D40A1AF EQ PUSH2 0x252 JUMPI DUP1 PUSH4 0xA035B1FE EQ PUSH2 0x265 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x4BA2363A GT PUSH2 0xD1 JUMPI DUP1 PUSH4 0x4BA2363A EQ PUSH2 0x1AF JUMPI DUP1 PUSH4 0x5B1687B0 EQ PUSH2 0x1D3 JUMPI DUP1 PUSH4 0x5D7CEB12 EQ PUSH2 0x1E6 JUMPI DUP1 PUSH4 0x71722F0A EQ PUSH2 0x206 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x35633B19 EQ PUSH2 0x103 JUMPI DUP1 PUSH4 0x3697615F EQ PUSH2 0x125 JUMPI DUP1 PUSH4 0x3943380C EQ PUSH2 0x162 JUMPI DUP1 PUSH4 0x3ED2B77A EQ PUSH2 0x182 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x10F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x11E CALLDATASIZE PUSH1 0x4 PUSH2 0xDED JUMP JUMPDEST PUSH2 0x306 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x131 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x9 SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND DUP2 MSTORE PUSH1 0x20 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x16E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x5 SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x18E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1A2 PUSH2 0x19D CALLDATASIZE PUSH1 0x4 PUSH2 0xE41 JUMP JUMPDEST PUSH2 0x393 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x159 SWAP2 SWAP1 PUSH2 0xE5A JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1BB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1C5 PUSH1 0x1 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0x159 JUMP JUMPDEST PUSH2 0x123 PUSH2 0x1E1 CALLDATASIZE PUSH1 0x4 PUSH2 0xEA8 JUMP JUMPDEST PUSH2 0x43F JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1F2 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0xA SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x212 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1C5 PUSH1 0x7 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x228 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1C5 PUSH1 0x2 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x23E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x3 SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST PUSH2 0x123 PUSH2 0x260 CALLDATASIZE PUSH1 0x4 PUSH2 0xEA8 JUMP JUMPDEST PUSH2 0x796 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x271 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1C5 PUSH1 0x0 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x287 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x296 CALLDATASIZE PUSH1 0x4 PUSH2 0xEA8 JUMP JUMPDEST PUSH2 0xAD0 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2A7 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0xB SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2C7 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1C5 PUSH1 0x6 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2DD JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0xBA9 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2F2 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST PUSH20 0x791F1CFB231E7C75EEE4B7F8913E3C2B3548EB93 CALLER EQ PUSH2 0x353 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x2 PUSH1 0x24 DUP3 ADD MSTORE PUSH2 0x6E6F PUSH1 0xF0 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x9 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP5 DUP6 AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT SWAP2 DUP3 AND OR SWAP1 SWAP2 SSTORE PUSH1 0xA DUP1 SLOAD SWAP4 DUP6 AND SWAP4 DUP3 AND SWAP4 SWAP1 SWAP4 OR SWAP1 SWAP3 SSTORE PUSH1 0xB DUP1 SLOAD SWAP2 SWAP1 SWAP4 AND SWAP2 AND OR SWAP1 SSTORE POP JUMP JUMPDEST PUSH1 0x8 DUP2 DUP2 SLOAD DUP2 LT PUSH2 0x3A3 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 ADD PUSH1 0x0 SWAP2 POP SWAP1 POP DUP1 SLOAD PUSH2 0x3BE SWAP1 PUSH2 0xECA JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x3EA SWAP1 PUSH2 0xECA JUMP JUMPDEST DUP1 ISZERO PUSH2 0x437 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x40C JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x437 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x41A JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP DUP2 JUMP JUMPDEST PUSH1 0x0 DUP3 GT DUP1 ISZERO PUSH2 0x45B JUMPI POP PUSH13 0x7E37BE2022C0914B2680000000 DUP3 LT JUMPDEST PUSH2 0x494 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0xA PUSH1 0x24 DUP3 ADD MSTORE PUSH10 0x62616420647265616D73 PUSH1 0xB0 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x34A JUMP JUMPDEST PUSH1 0xB SLOAD PUSH1 0x40 MLOAD PUSH4 0xAE104265 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 DUP2 ADD DUP5 SWAP1 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND SWAP1 PUSH4 0xAE104265 SWAP1 PUSH1 0x24 ADD PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x4DD JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x501 SWAP2 SWAP1 PUSH2 0xF04 JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 SSTORE CALLVALUE LT ISZERO PUSH2 0x544 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0xC PUSH1 0x24 DUP3 ADD MSTORE PUSH12 0x18D85B89DD081859999BDC99 PUSH1 0xA2 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x34A JUMP JUMPDEST PUSH1 0x0 DUP2 GT DUP1 ISZERO PUSH2 0x555 JUMPI POP PUSH1 0x4 DUP2 GT ISZERO JUMPDEST PUSH2 0x58B JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x7 PUSH1 0x24 DUP3 ADD MSTORE PUSH7 0x6261647465616D PUSH1 0xC8 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x34A JUMP JUMPDEST PUSH1 0x0 DUP1 DUP3 PUSH1 0x1 SUB PUSH2 0x5A1 JUMPI POP PUSH1 0x5 SWAP1 POP DUP1 PUSH2 0x5D8 JUMP JUMPDEST DUP3 PUSH1 0x2 SUB PUSH2 0x5B4 JUMPI POP PUSH1 0xF SWAP1 POP DUP1 PUSH2 0x5D8 JUMP JUMPDEST DUP3 PUSH1 0x3 SUB PUSH2 0x5C8 JUMPI POP PUSH1 0x1E SWAP1 POP PUSH1 0x5 PUSH2 0x5D8 JUMP JUMPDEST DUP3 PUSH1 0x4 SUB PUSH2 0x5D8 JUMPI POP PUSH1 0x5 SWAP1 POP PUSH1 0x1E JUMPDEST PUSH1 0x9 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP3 PUSH2 0x5F0 PUSH1 0x64 CALLVALUE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0x5FA SWAP2 SWAP1 PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x63C JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x641 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0xA SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 POP DUP2 PUSH2 0x65D PUSH1 0x64 CALLVALUE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0x667 SWAP2 SWAP1 PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x6A9 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x6AE JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0x3 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 POP PUSH2 0x6C9 PUSH1 0x64 CALLVALUE PUSH2 0xF33 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x70B JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x710 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0xB SLOAD PUSH1 0x40 MLOAD PUSH4 0xAB714FB PUSH1 0xE1 SHL DUP2 MSTORE CALLER PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 DUP2 ADD DUP8 SWAP1 MSTORE PUSH1 0x44 DUP2 ADD DUP7 SWAP1 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND SWAP2 POP PUSH4 0x156E29F6 SWAP1 PUSH1 0x64 ADD PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 GAS CALL ISZERO DUP1 ISZERO PUSH2 0x76B JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x78F SWAP2 SWAP1 PUSH2 0xF72 JUMP JUMPDEST POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 GT DUP1 ISZERO PUSH2 0x7A8 JUMPI POP PUSH2 0x3E8 DUP3 GT ISZERO JUMPDEST PUSH2 0x7E1 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0xA PUSH1 0x24 DUP3 ADD MSTORE PUSH10 0x62616420647265616D73 PUSH1 0xB0 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x34A JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD SWAP1 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x81A JUMPI PUSH1 0x64 PUSH2 0x7FC DUP4 PUSH1 0x65 PUSH2 0xF55 JUMP JUMPDEST PUSH2 0x806 SWAP2 SWAP1 PUSH2 0xF33 JUMP JUMPDEST SWAP2 POP DUP1 PUSH2 0x812 DUP2 PUSH2 0xF9B JUMP JUMPDEST SWAP2 POP POP PUSH2 0x7E7 JUMP JUMPDEST POP DUP1 CALLVALUE LT ISZERO PUSH2 0x828 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x64 PUSH2 0x835 DUP3 PUSH1 0x65 PUSH2 0xF55 JUMP JUMPDEST PUSH2 0x83F SWAP2 SWAP1 PUSH2 0xF33 JUMP JUMPDEST PUSH1 0x0 SSTORE PUSH2 0x84D PUSH1 0x64 CALLVALUE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0x858 SWAP1 PUSH1 0x4E PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x869 SWAP2 SWAP1 PUSH2 0xFB4 JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP DUP2 ISZERO DUP1 ISZERO SWAP1 PUSH2 0x87E JUMPI POP PUSH1 0x4 DUP3 GT ISZERO JUMPDEST PUSH2 0x8B4 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x7 PUSH1 0x24 DUP3 ADD MSTORE PUSH7 0x6261647465616D PUSH1 0xC8 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x34A JUMP JUMPDEST PUSH1 0x0 DUP1 DUP4 PUSH1 0x1 SUB PUSH2 0x8CA JUMPI POP PUSH1 0x5 SWAP1 POP DUP1 PUSH2 0x901 JUMP JUMPDEST DUP4 PUSH1 0x2 SUB PUSH2 0x8DD JUMPI POP PUSH1 0xF SWAP1 POP DUP1 PUSH2 0x901 JUMP JUMPDEST DUP4 PUSH1 0x3 SUB PUSH2 0x8F1 JUMPI POP PUSH1 0x1E SWAP1 POP PUSH1 0x5 PUSH2 0x901 JUMP JUMPDEST DUP4 PUSH1 0x4 SUB PUSH2 0x901 JUMPI POP PUSH1 0x5 SWAP1 POP PUSH1 0x1E JUMPDEST PUSH1 0x9 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP3 PUSH2 0x919 PUSH1 0x64 CALLVALUE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0x923 SWAP2 SWAP1 PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x965 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x96A JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0xA SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 POP DUP2 PUSH2 0x986 PUSH1 0x64 CALLVALUE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0x990 SWAP2 SWAP1 PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x9D2 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x9D7 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0x3 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 POP PUSH2 0x9F2 PUSH1 0x64 CALLVALUE PUSH2 0xF33 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0xA34 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0xA39 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP POP PUSH1 0x0 JUMPDEST DUP6 DUP2 LT ISZERO PUSH2 0xAC8 JUMPI PUSH1 0x5 SLOAD PUSH1 0x40 MLOAD PUSH4 0x797D909 PUSH1 0xE5 SHL DUP2 MSTORE CALLER PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND SWAP1 PUSH4 0xF2FB2120 SWAP1 PUSH1 0x24 ADD PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 GAS CALL ISZERO DUP1 ISZERO PUSH2 0xA91 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0xAB5 SWAP2 SWAP1 PUSH2 0xF04 JUMP JUMPDEST POP DUP1 PUSH2 0xAC0 DUP2 PUSH2 0xF9B JUMP JUMPDEST SWAP2 POP POP PUSH2 0xA3F JUMP JUMPDEST POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 GT DUP1 ISZERO PUSH2 0xAE1 JUMPI POP PUSH1 0x4 DUP2 GT ISZERO JUMPDEST PUSH2 0xB18 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x8 PUSH1 0x24 DUP3 ADD MSTORE PUSH8 0x626164207465616D PUSH1 0xC0 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x34A JUMP JUMPDEST PUSH1 0x7 DUP2 SWAP1 SSTORE PUSH1 0x5 SLOAD PUSH1 0x40 MLOAD PUSH4 0x2770A7EB PUSH1 0xE2 SHL DUP2 MSTORE CALLER PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 DUP2 ADD DUP5 SWAP1 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND SWAP1 PUSH4 0x9DC29FAC SWAP1 PUSH1 0x44 ADD PUSH1 0x0 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0xB69 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS CALL ISZERO DUP1 ISZERO PUSH2 0xB7D JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP TIMESTAMP PUSH3 0x15180 PUSH2 0xB90 SWAP2 SWAP1 PUSH2 0xFB4 JUMP JUMPDEST PUSH1 0x2 SSTORE POP POP PUSH1 0x4 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND CALLER OR SWAP1 SSTORE JUMP JUMPDEST PUSH1 0x2 SLOAD TIMESTAMP LT ISZERO PUSH2 0xBEE JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x10 PUSH1 0x24 DUP3 ADD MSTORE PUSH16 0x3737BA103A34B6B2903830B230BBB0B7 PUSH1 0x81 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x34A JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0x7 SLOAD PUSH1 0x1 SUB PUSH2 0xC0C JUMPI POP PUSH1 0x3C SWAP2 POP PUSH1 0xA SWAP1 POP DUP1 PUSH2 0xC54 JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH1 0x2 SUB PUSH2 0xC24 JUMPI POP PUSH1 0x1E SWAP2 POP DUP2 SWAP1 POP DUP1 PUSH2 0xC54 JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH1 0x3 SUB PUSH2 0xC3E JUMPI POP PUSH1 0x14 SWAP2 POP PUSH1 0x3C SWAP1 POP PUSH1 0xA PUSH2 0xC54 JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH1 0x4 SUB PUSH2 0xC54 JUMPI POP PUSH1 0x14 SWAP2 POP PUSH1 0xA SWAP1 POP PUSH1 0x3C JUMPDEST PUSH1 0x4 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP4 PUSH2 0xC6C PUSH1 0x64 SELFBALANCE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0xC76 SWAP2 SWAP1 PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0xCB8 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0xCBD JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0x9 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 POP DUP3 PUSH2 0xCD9 PUSH1 0x64 SELFBALANCE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0xCE3 SWAP2 SWAP1 PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0xD25 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0xD2A JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0xA SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 POP DUP2 PUSH2 0xD46 PUSH1 0x64 SELFBALANCE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0xD50 SWAP2 SWAP1 PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0xD92 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0xD97 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0x3 SLOAD PUSH1 0x4 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP3 AND SWAP2 SWAP1 SWAP2 OR SWAP1 SSTORE POP PUSH2 0xDC9 TIMESTAMP PUSH3 0x15180 PUSH2 0xFB4 JUMP JUMPDEST PUSH1 0x2 SSTORE POP POP POP JUMP JUMPDEST DUP1 CALLDATALOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 EQ PUSH2 0xDE8 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP1 PUSH1 0x80 DUP6 DUP8 SUB SLT ISZERO PUSH2 0xE03 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xE0C DUP6 PUSH2 0xDD1 JUMP JUMPDEST SWAP4 POP PUSH2 0xE1A PUSH1 0x20 DUP7 ADD PUSH2 0xDD1 JUMP JUMPDEST SWAP3 POP PUSH2 0xE28 PUSH1 0x40 DUP7 ADD PUSH2 0xDD1 JUMP JUMPDEST SWAP2 POP PUSH2 0xE36 PUSH1 0x60 DUP7 ADD PUSH2 0xDD1 JUMP JUMPDEST SWAP1 POP SWAP3 SWAP6 SWAP2 SWAP5 POP SWAP3 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xE53 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP1 DUP4 MSTORE DUP4 MLOAD DUP1 DUP3 DUP6 ADD MSTORE PUSH1 0x0 JUMPDEST DUP2 DUP2 LT ISZERO PUSH2 0xE87 JUMPI DUP6 DUP2 ADD DUP4 ADD MLOAD DUP6 DUP3 ADD PUSH1 0x40 ADD MSTORE DUP3 ADD PUSH2 0xE6B JUMP JUMPDEST POP PUSH1 0x0 PUSH1 0x40 DUP3 DUP7 ADD ADD MSTORE PUSH1 0x40 PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND DUP6 ADD ADD SWAP3 POP POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0xEBB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP POP DUP1 CALLDATALOAD SWAP3 PUSH1 0x20 SWAP1 SWAP2 ADD CALLDATALOAD SWAP2 POP JUMP JUMPDEST PUSH1 0x1 DUP2 DUP2 SHR SWAP1 DUP3 AND DUP1 PUSH2 0xEDE JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 SUB PUSH2 0xEFE JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xF16 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD SWAP2 SWAP1 POP JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP3 PUSH2 0xF50 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x12 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP DIV SWAP1 JUMP JUMPDEST DUP1 DUP3 MUL DUP2 ISZERO DUP3 DUP3 DIV DUP5 EQ OR PUSH2 0xF6C JUMPI PUSH2 0xF6C PUSH2 0xF1D JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xF84 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 MLOAD DUP1 ISZERO ISZERO DUP2 EQ PUSH2 0xF94 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 DUP3 ADD PUSH2 0xFAD JUMPI PUSH2 0xFAD PUSH2 0xF1D JUMP JUMPDEST POP PUSH1 0x1 ADD SWAP1 JUMP JUMPDEST DUP1 DUP3 ADD DUP1 DUP3 GT ISZERO PUSH2 0xF6C JUMPI PUSH2 0xF6C PUSH2 0xF1D JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xD6 CODESIZE 0xBC 0x2E SWAP10 0x24 NUMBER 0x2C 0xBD SSTORE PUSH27 0x8216B1C0AD961B8181DE749A7A5598D7A903C01A5964736F6C6343 STOP ADDMOD GT STOP CALLER ",
			"sourceMap": "1325:57:18:-:0;;;;;-1:-1:-1;;;1325:57:18;;528:5730;1325:57;;;;;;;-1:-1:-1;;;1325:57:18;;-1:-1:-1;1325:57:18;;;;;-1:-1:-1;;;1325:57:18;;-1:-1:-1;1325:57:18;;528:5730;1325:57;;;;;-1:-1:-1;;;1325:57:18;;-1:-1:-1;1325:57:18;;;;;528:5730;1325:57;:::i;:::-;;1480:408;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;1581:5;:14;;;1607:9;:18;;;1637:3;:25;;-1:-1:-1;;;;;1637:25:18;;;-1:-1:-1;;;;;;1637:25:18;;;;;;;1674:6;:39;;;;;;;;;;;1725:9;:43;;;;;;;;;;;;;;;1780:5;:27;;;;1796:10;1780:27;;;;;;1819:6;:14;;;;;;;;1853:26;:15;1871:8;1853:26;:::i;:::-;1845:5;:34;-1:-1:-1;528:5730:18;;-1:-1:-1;;;528:5730:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;528:5730:18;;;-1:-1:-1;528:5730:18;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;;;14:177:19;93:13;;-1:-1:-1;;;;;135:31:19;;125:42;;115:70;;181:1;178;171:12;115:70;14:177;;;:::o;196:440::-;293:6;301;309;317;370:3;358:9;349:7;345:23;341:33;338:53;;;387:1;384;377:12;338:53;416:9;410:16;400:26;;445:49;490:2;479:9;475:18;445:49;:::i;:::-;435:59;;513:49;558:2;547:9;543:18;513:49;:::i;:::-;503:59;;581:49;626:2;615:9;611:18;581:49;:::i;:::-;571:59;;196:440;;;;;;;:::o;641:222::-;706:9;;;727:10;;;724:133;;;779:10;774:3;770:20;767:1;760:31;814:4;811:1;804:15;842:4;839:1;832:15;724:133;641:222;;;;:::o;868:127::-;929:10;924:3;920:20;917:1;910:31;960:4;957:1;950:15;984:4;981:1;974:15;1000:380;1079:1;1075:12;;;;1122;;;1143:61;;1197:4;1189:6;1185:17;1175:27;;1143:61;1250:2;1242:6;1239:14;1219:18;1216:38;1213:161;;1296:10;1291:3;1287:20;1284:1;1277:31;1331:4;1328:1;1321:15;1359:4;1356:1;1349:15;1213:161;;1000:380;;;:::o;1511:545::-;1613:2;1608:3;1605:11;1602:448;;;1649:1;1674:5;1670:2;1663:17;1719:4;1715:2;1705:19;1789:2;1777:10;1773:19;1770:1;1766:27;1760:4;1756:38;1825:4;1813:10;1810:20;1807:47;;;-1:-1:-1;1848:4:19;1807:47;1903:2;1898:3;1894:12;1891:1;1887:20;1881:4;1877:31;1867:41;;1958:82;1976:2;1969:5;1966:13;1958:82;;;2021:17;;;2002:1;1991:13;1958:82;;;1962:3;;;1602:448;1511:545;;;:::o;2232:1352::-;2352:10;;-1:-1:-1;;;;;2374:30:19;;2371:56;;;2407:18;;:::i;:::-;2436:97;2526:6;2486:38;2518:4;2512:11;2486:38;:::i;:::-;2480:4;2436:97;:::i;:::-;2588:4;;2652:2;2641:14;;2669:1;2664:663;;;;3371:1;3388:6;3385:89;;;-1:-1:-1;3440:19:19;;;3434:26;3385:89;-1:-1:-1;;2189:1:19;2185:11;;;2181:24;2177:29;2167:40;2213:1;2209:11;;;2164:57;3487:81;;2634:944;;2664:663;1458:1;1451:14;;;1495:4;1482:18;;-1:-1:-1;;2700:20:19;;;2818:236;2832:7;2829:1;2826:14;2818:236;;;2921:19;;;2915:26;2900:42;;3013:27;;;;2981:1;2969:14;;;;2848:19;;2818:236;;;2822:3;3082:6;3073:7;3070:19;3067:201;;;3143:19;;;3137:26;-1:-1:-1;;3226:1:19;3222:14;;;3238:3;3218:24;3214:37;3210:42;3195:58;3180:74;;3067:201;-1:-1:-1;;;;;3314:1:19;3298:14;;;3294:22;3281:36;;-1:-1:-1;2232:1352:19:o;:::-;528:5730:18;;;;;;"
		},
		"deployedBytecode": {
			"functionDebugData": {
				"@basePrice_3916": {
					"entryPoint": null,
					"id": 3916,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@burn_4088": {
					"entryPoint": 2768,
					"id": 4088,
					"parameterSlots": 2,
					"returnSlots": 0
				},
				"@concludeRound_4637": {
					"entryPoint": 2985,
					"id": 4637,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@fanout_3929": {
					"entryPoint": null,
					"id": 3929,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@ifIwasinla2_4470": {
					"entryPoint": 1087,
					"id": 4470,
					"parameterSlots": 2,
					"returnSlots": 0
				},
				"@ifIwasinla_4301": {
					"entryPoint": 1942,
					"id": 4301,
					"parameterSlots": 2,
					"returnSlots": 0
				},
				"@j3d_3935": {
					"entryPoint": null,
					"id": 3935,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@key_3914": {
					"entryPoint": null,
					"id": 3914,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@lastTeam_3918": {
					"entryPoint": null,
					"id": 3918,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@owner_3909": {
					"entryPoint": null,
					"id": 3909,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@pot_3905": {
					"entryPoint": null,
					"id": 3905,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@price_3903": {
					"entryPoint": null,
					"id": 3903,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@setStuff_4045": {
					"entryPoint": 774,
					"id": 4045,
					"parameterSlots": 4,
					"returnSlots": 0
				},
				"@teams_3926": {
					"entryPoint": 915,
					"id": 3926,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@timer_3907": {
					"entryPoint": null,
					"id": 3907,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@tokFanout_3932": {
					"entryPoint": null,
					"id": 3932,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@winner_3911": {
					"entryPoint": null,
					"id": 3911,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"abi_decode_address": {
					"entryPoint": 3537,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_decode_tuple_t_addresst_addresst_addresst_address": {
					"entryPoint": 3565,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 4
				},
				"abi_decode_tuple_t_bool_fromMemory": {
					"entryPoint": 3954,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_tuple_t_uint256": {
					"entryPoint": 3649,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_tuple_t_uint256_fromMemory": {
					"entryPoint": 3844,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_tuple_t_uint256t_uint256": {
					"entryPoint": 3752,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 2
				},
				"abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_address__to_t_address__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_address_payable__to_t_address_payable__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_address_t_uint256__to_t_address_t_uint256__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 3,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_address_t_uint256_t_uint256__to_t_address_t_uint256_t_uint256__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 4,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_contract$_Fanout_$4823__to_t_address_payable__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_contract$_GameItem_$4951__to_t_address__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_contract$_J3d_$5437__to_t_address__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_contract$_NFTFanout_$5177__to_t_address_payable__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_string_memory_ptr__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": 3674,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_stringliteral_74c6ac64113c77c5db7f403e306ca178ee70ad85cbe5d196a73afc7ca47a0304__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_stringliteral_b26c376d11400a621f577fbee397d0e0d91c5e11fac6ea73a2358c79152af489__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_stringliteral_dfc0c2a86ca97a3be5ef2e0e08cdd76e7eeb73c8ef35b45c84547790e2b1a0b3__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_stringliteral_e2a1e738e2d231a4c0e05575155ac1c8c0cd8d6b7e91617fd1b5a419c73aca2c__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_stringliteral_e709923cd19cdd8e337bc7230f9abbf596a88739ed5fc4ba10e63af263236301__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"checked_add_t_uint256": {
					"entryPoint": 4020,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"checked_div_t_uint256": {
					"entryPoint": 3891,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"checked_mul_t_uint256": {
					"entryPoint": 3925,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"extract_byte_array_length": {
					"entryPoint": 3786,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"increment_t_uint256": {
					"entryPoint": 3995,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"panic_error_0x11": {
					"entryPoint": 3869,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				}
			},
			"generatedSources": [
				{
					"ast": {
						"nodeType": "YulBlock",
						"src": "0:7636:19",
						"statements": [
							{
								"nodeType": "YulBlock",
								"src": "6:3:19",
								"statements": []
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "63:124:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "73:29:19",
											"value": {
												"arguments": [
													{
														"name": "offset",
														"nodeType": "YulIdentifier",
														"src": "95:6:19"
													}
												],
												"functionName": {
													"name": "calldataload",
													"nodeType": "YulIdentifier",
													"src": "82:12:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "82:20:19"
											},
											"variableNames": [
												{
													"name": "value",
													"nodeType": "YulIdentifier",
													"src": "73:5:19"
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "165:16:19",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "174:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "177:1:19",
																	"type": "",
																	"value": "0"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "167:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "167:12:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "167:12:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "124:5:19"
															},
															{
																"arguments": [
																	{
																		"name": "value",
																		"nodeType": "YulIdentifier",
																		"src": "135:5:19"
																	},
																	{
																		"arguments": [
																			{
																				"arguments": [
																					{
																						"kind": "number",
																						"nodeType": "YulLiteral",
																						"src": "150:3:19",
																						"type": "",
																						"value": "160"
																					},
																					{
																						"kind": "number",
																						"nodeType": "YulLiteral",
																						"src": "155:1:19",
																						"type": "",
																						"value": "1"
																					}
																				],
																				"functionName": {
																					"name": "shl",
																					"nodeType": "YulIdentifier",
																					"src": "146:3:19"
																				},
																				"nodeType": "YulFunctionCall",
																				"src": "146:11:19"
																			},
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "159:1:19",
																				"type": "",
																				"value": "1"
																			}
																		],
																		"functionName": {
																			"name": "sub",
																			"nodeType": "YulIdentifier",
																			"src": "142:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "142:19:19"
																	}
																],
																"functionName": {
																	"name": "and",
																	"nodeType": "YulIdentifier",
																	"src": "131:3:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "131:31:19"
															}
														],
														"functionName": {
															"name": "eq",
															"nodeType": "YulIdentifier",
															"src": "121:2:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "121:42:19"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "114:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "114:50:19"
											},
											"nodeType": "YulIf",
											"src": "111:70:19"
										}
									]
								},
								"name": "abi_decode_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "offset",
										"nodeType": "YulTypedName",
										"src": "42:6:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "53:5:19",
										"type": ""
									}
								],
								"src": "14:173:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "313:288:19",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "360:16:19",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "369:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "372:1:19",
																	"type": "",
																	"value": "0"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "362:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "362:12:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "362:12:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "334:7:19"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "343:9:19"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "330:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "330:23:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "355:3:19",
														"type": "",
														"value": "128"
													}
												],
												"functionName": {
													"name": "slt",
													"nodeType": "YulIdentifier",
													"src": "326:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "326:33:19"
											},
											"nodeType": "YulIf",
											"src": "323:53:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "385:39:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "414:9:19"
													}
												],
												"functionName": {
													"name": "abi_decode_address",
													"nodeType": "YulIdentifier",
													"src": "395:18:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "395:29:19"
											},
											"variableNames": [
												{
													"name": "value0",
													"nodeType": "YulIdentifier",
													"src": "385:6:19"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "433:48:19",
											"value": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "466:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "477:2:19",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "462:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "462:18:19"
													}
												],
												"functionName": {
													"name": "abi_decode_address",
													"nodeType": "YulIdentifier",
													"src": "443:18:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "443:38:19"
											},
											"variableNames": [
												{
													"name": "value1",
													"nodeType": "YulIdentifier",
													"src": "433:6:19"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "490:48:19",
											"value": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "523:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "534:2:19",
																"type": "",
																"value": "64"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "519:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "519:18:19"
													}
												],
												"functionName": {
													"name": "abi_decode_address",
													"nodeType": "YulIdentifier",
													"src": "500:18:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "500:38:19"
											},
											"variableNames": [
												{
													"name": "value2",
													"nodeType": "YulIdentifier",
													"src": "490:6:19"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "547:48:19",
											"value": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "580:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "591:2:19",
																"type": "",
																"value": "96"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "576:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "576:18:19"
													}
												],
												"functionName": {
													"name": "abi_decode_address",
													"nodeType": "YulIdentifier",
													"src": "557:18:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "557:38:19"
											},
											"variableNames": [
												{
													"name": "value3",
													"nodeType": "YulIdentifier",
													"src": "547:6:19"
												}
											]
										}
									]
								},
								"name": "abi_decode_tuple_t_addresst_addresst_addresst_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "255:9:19",
										"type": ""
									},
									{
										"name": "dataEnd",
										"nodeType": "YulTypedName",
										"src": "266:7:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "278:6:19",
										"type": ""
									},
									{
										"name": "value1",
										"nodeType": "YulTypedName",
										"src": "286:6:19",
										"type": ""
									},
									{
										"name": "value2",
										"nodeType": "YulTypedName",
										"src": "294:6:19",
										"type": ""
									},
									{
										"name": "value3",
										"nodeType": "YulTypedName",
										"src": "302:6:19",
										"type": ""
									}
								],
								"src": "192:409:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "733:102:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "743:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "755:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "766:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "751:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "751:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "743:4:19"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "785:9:19"
													},
													{
														"arguments": [
															{
																"name": "value0",
																"nodeType": "YulIdentifier",
																"src": "800:6:19"
															},
															{
																"arguments": [
																	{
																		"arguments": [
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "816:3:19",
																				"type": "",
																				"value": "160"
																			},
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "821:1:19",
																				"type": "",
																				"value": "1"
																			}
																		],
																		"functionName": {
																			"name": "shl",
																			"nodeType": "YulIdentifier",
																			"src": "812:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "812:11:19"
																	},
																	{
																		"kind": "number",
																		"nodeType": "YulLiteral",
																		"src": "825:1:19",
																		"type": "",
																		"value": "1"
																	}
																],
																"functionName": {
																	"name": "sub",
																	"nodeType": "YulIdentifier",
																	"src": "808:3:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "808:19:19"
															}
														],
														"functionName": {
															"name": "and",
															"nodeType": "YulIdentifier",
															"src": "796:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "796:32:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "778:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "778:51:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "778:51:19"
										}
									]
								},
								"name": "abi_encode_tuple_t_contract$_NFTFanout_$5177__to_t_address_payable__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "702:9:19",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "713:6:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "724:4:19",
										"type": ""
									}
								],
								"src": "606:229:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "958:102:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "968:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "980:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "991:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "976:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "976:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "968:4:19"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "1010:9:19"
													},
													{
														"arguments": [
															{
																"name": "value0",
																"nodeType": "YulIdentifier",
																"src": "1025:6:19"
															},
															{
																"arguments": [
																	{
																		"arguments": [
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "1041:3:19",
																				"type": "",
																				"value": "160"
																			},
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "1046:1:19",
																				"type": "",
																				"value": "1"
																			}
																		],
																		"functionName": {
																			"name": "shl",
																			"nodeType": "YulIdentifier",
																			"src": "1037:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "1037:11:19"
																	},
																	{
																		"kind": "number",
																		"nodeType": "YulLiteral",
																		"src": "1050:1:19",
																		"type": "",
																		"value": "1"
																	}
																],
																"functionName": {
																	"name": "sub",
																	"nodeType": "YulIdentifier",
																	"src": "1033:3:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "1033:19:19"
															}
														],
														"functionName": {
															"name": "and",
															"nodeType": "YulIdentifier",
															"src": "1021:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "1021:32:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "1003:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1003:51:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "1003:51:19"
										}
									]
								},
								"name": "abi_encode_tuple_t_contract$_GameItem_$4951__to_t_address__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "927:9:19",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "938:6:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "949:4:19",
										"type": ""
									}
								],
								"src": "840:220:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1135:110:19",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "1181:16:19",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "1190:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "1193:1:19",
																	"type": "",
																	"value": "0"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "1183:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "1183:12:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "1183:12:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "1156:7:19"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "1165:9:19"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "1152:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "1152:23:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1177:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "slt",
													"nodeType": "YulIdentifier",
													"src": "1148:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1148:32:19"
											},
											"nodeType": "YulIf",
											"src": "1145:52:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "1206:33:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "1229:9:19"
													}
												],
												"functionName": {
													"name": "calldataload",
													"nodeType": "YulIdentifier",
													"src": "1216:12:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1216:23:19"
											},
											"variableNames": [
												{
													"name": "value0",
													"nodeType": "YulIdentifier",
													"src": "1206:6:19"
												}
											]
										}
									]
								},
								"name": "abi_decode_tuple_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "1101:9:19",
										"type": ""
									},
									{
										"name": "dataEnd",
										"nodeType": "YulTypedName",
										"src": "1112:7:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "1124:6:19",
										"type": ""
									}
								],
								"src": "1065:180:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1371:427:19",
									"statements": [
										{
											"nodeType": "YulVariableDeclaration",
											"src": "1381:12:19",
											"value": {
												"kind": "number",
												"nodeType": "YulLiteral",
												"src": "1391:2:19",
												"type": "",
												"value": "32"
											},
											"variables": [
												{
													"name": "_1",
													"nodeType": "YulTypedName",
													"src": "1385:2:19",
													"type": ""
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "1409:9:19"
													},
													{
														"name": "_1",
														"nodeType": "YulIdentifier",
														"src": "1420:2:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "1402:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1402:21:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "1402:21:19"
										},
										{
											"nodeType": "YulVariableDeclaration",
											"src": "1432:27:19",
											"value": {
												"arguments": [
													{
														"name": "value0",
														"nodeType": "YulIdentifier",
														"src": "1452:6:19"
													}
												],
												"functionName": {
													"name": "mload",
													"nodeType": "YulIdentifier",
													"src": "1446:5:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1446:13:19"
											},
											"variables": [
												{
													"name": "length",
													"nodeType": "YulTypedName",
													"src": "1436:6:19",
													"type": ""
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "1479:9:19"
															},
															{
																"name": "_1",
																"nodeType": "YulIdentifier",
																"src": "1490:2:19"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "1475:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "1475:18:19"
													},
													{
														"name": "length",
														"nodeType": "YulIdentifier",
														"src": "1495:6:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "1468:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1468:34:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "1468:34:19"
										},
										{
											"nodeType": "YulVariableDeclaration",
											"src": "1511:10:19",
											"value": {
												"kind": "number",
												"nodeType": "YulLiteral",
												"src": "1520:1:19",
												"type": "",
												"value": "0"
											},
											"variables": [
												{
													"name": "i",
													"nodeType": "YulTypedName",
													"src": "1515:1:19",
													"type": ""
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "1580:90:19",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"arguments": [
																		{
																			"arguments": [
																				{
																					"name": "headStart",
																					"nodeType": "YulIdentifier",
																					"src": "1609:9:19"
																				},
																				{
																					"name": "i",
																					"nodeType": "YulIdentifier",
																					"src": "1620:1:19"
																				}
																			],
																			"functionName": {
																				"name": "add",
																				"nodeType": "YulIdentifier",
																				"src": "1605:3:19"
																			},
																			"nodeType": "YulFunctionCall",
																			"src": "1605:17:19"
																		},
																		{
																			"kind": "number",
																			"nodeType": "YulLiteral",
																			"src": "1624:2:19",
																			"type": "",
																			"value": "64"
																		}
																	],
																	"functionName": {
																		"name": "add",
																		"nodeType": "YulIdentifier",
																		"src": "1601:3:19"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "1601:26:19"
																},
																{
																	"arguments": [
																		{
																			"arguments": [
																				{
																					"arguments": [
																						{
																							"name": "value0",
																							"nodeType": "YulIdentifier",
																							"src": "1643:6:19"
																						},
																						{
																							"name": "i",
																							"nodeType": "YulIdentifier",
																							"src": "1651:1:19"
																						}
																					],
																					"functionName": {
																						"name": "add",
																						"nodeType": "YulIdentifier",
																						"src": "1639:3:19"
																					},
																					"nodeType": "YulFunctionCall",
																					"src": "1639:14:19"
																				},
																				{
																					"name": "_1",
																					"nodeType": "YulIdentifier",
																					"src": "1655:2:19"
																				}
																			],
																			"functionName": {
																				"name": "add",
																				"nodeType": "YulIdentifier",
																				"src": "1635:3:19"
																			},
																			"nodeType": "YulFunctionCall",
																			"src": "1635:23:19"
																		}
																	],
																	"functionName": {
																		"name": "mload",
																		"nodeType": "YulIdentifier",
																		"src": "1629:5:19"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "1629:30:19"
																}
															],
															"functionName": {
																"name": "mstore",
																"nodeType": "YulIdentifier",
																"src": "1594:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "1594:66:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "1594:66:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "i",
														"nodeType": "YulIdentifier",
														"src": "1541:1:19"
													},
													{
														"name": "length",
														"nodeType": "YulIdentifier",
														"src": "1544:6:19"
													}
												],
												"functionName": {
													"name": "lt",
													"nodeType": "YulIdentifier",
													"src": "1538:2:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1538:13:19"
											},
											"nodeType": "YulForLoop",
											"post": {
												"nodeType": "YulBlock",
												"src": "1552:19:19",
												"statements": [
													{
														"nodeType": "YulAssignment",
														"src": "1554:15:19",
														"value": {
															"arguments": [
																{
																	"name": "i",
																	"nodeType": "YulIdentifier",
																	"src": "1563:1:19"
																},
																{
																	"name": "_1",
																	"nodeType": "YulIdentifier",
																	"src": "1566:2:19"
																}
															],
															"functionName": {
																"name": "add",
																"nodeType": "YulIdentifier",
																"src": "1559:3:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "1559:10:19"
														},
														"variableNames": [
															{
																"name": "i",
																"nodeType": "YulIdentifier",
																"src": "1554:1:19"
															}
														]
													}
												]
											},
											"pre": {
												"nodeType": "YulBlock",
												"src": "1534:3:19",
												"statements": []
											},
											"src": "1530:140:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "headStart",
																		"nodeType": "YulIdentifier",
																		"src": "1694:9:19"
																	},
																	{
																		"name": "length",
																		"nodeType": "YulIdentifier",
																		"src": "1705:6:19"
																	}
																],
																"functionName": {
																	"name": "add",
																	"nodeType": "YulIdentifier",
																	"src": "1690:3:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "1690:22:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "1714:2:19",
																"type": "",
																"value": "64"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "1686:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "1686:31:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1719:1:19",
														"type": "",
														"value": "0"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "1679:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1679:42:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "1679:42:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "1730:62:19",
											"value": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "1746:9:19"
															},
															{
																"arguments": [
																	{
																		"arguments": [
																			{
																				"name": "length",
																				"nodeType": "YulIdentifier",
																				"src": "1765:6:19"
																			},
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "1773:2:19",
																				"type": "",
																				"value": "31"
																			}
																		],
																		"functionName": {
																			"name": "add",
																			"nodeType": "YulIdentifier",
																			"src": "1761:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "1761:15:19"
																	},
																	{
																		"arguments": [
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "1782:2:19",
																				"type": "",
																				"value": "31"
																			}
																		],
																		"functionName": {
																			"name": "not",
																			"nodeType": "YulIdentifier",
																			"src": "1778:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "1778:7:19"
																	}
																],
																"functionName": {
																	"name": "and",
																	"nodeType": "YulIdentifier",
																	"src": "1757:3:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "1757:29:19"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "1742:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "1742:45:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1789:2:19",
														"type": "",
														"value": "64"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "1738:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1738:54:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "1730:4:19"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_string_memory_ptr__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "1340:9:19",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "1351:6:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "1362:4:19",
										"type": ""
									}
								],
								"src": "1250:548:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1904:76:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "1914:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "1926:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1937:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "1922:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1922:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "1914:4:19"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "1956:9:19"
													},
													{
														"name": "value0",
														"nodeType": "YulIdentifier",
														"src": "1967:6:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "1949:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "1949:25:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "1949:25:19"
										}
									]
								},
								"name": "abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "1873:9:19",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "1884:6:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "1895:4:19",
										"type": ""
									}
								],
								"src": "1803:177:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2072:161:19",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "2118:16:19",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "2127:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "2130:1:19",
																	"type": "",
																	"value": "0"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "2120:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "2120:12:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "2120:12:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "2093:7:19"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "2102:9:19"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "2089:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "2089:23:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "2114:2:19",
														"type": "",
														"value": "64"
													}
												],
												"functionName": {
													"name": "slt",
													"nodeType": "YulIdentifier",
													"src": "2085:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "2085:32:19"
											},
											"nodeType": "YulIf",
											"src": "2082:52:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "2143:33:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "2166:9:19"
													}
												],
												"functionName": {
													"name": "calldataload",
													"nodeType": "YulIdentifier",
													"src": "2153:12:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "2153:23:19"
											},
											"variableNames": [
												{
													"name": "value0",
													"nodeType": "YulIdentifier",
													"src": "2143:6:19"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "2185:42:19",
											"value": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "2212:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "2223:2:19",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "2208:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "2208:18:19"
													}
												],
												"functionName": {
													"name": "calldataload",
													"nodeType": "YulIdentifier",
													"src": "2195:12:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "2195:32:19"
											},
											"variableNames": [
												{
													"name": "value1",
													"nodeType": "YulIdentifier",
													"src": "2185:6:19"
												}
											]
										}
									]
								},
								"name": "abi_decode_tuple_t_uint256t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "2030:9:19",
										"type": ""
									},
									{
										"name": "dataEnd",
										"nodeType": "YulTypedName",
										"src": "2041:7:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "2053:6:19",
										"type": ""
									},
									{
										"name": "value1",
										"nodeType": "YulTypedName",
										"src": "2061:6:19",
										"type": ""
									}
								],
								"src": "1985:248:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2362:102:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "2372:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "2384:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "2395:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "2380:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "2380:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "2372:4:19"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "2414:9:19"
													},
													{
														"arguments": [
															{
																"name": "value0",
																"nodeType": "YulIdentifier",
																"src": "2429:6:19"
															},
															{
																"arguments": [
																	{
																		"arguments": [
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "2445:3:19",
																				"type": "",
																				"value": "160"
																			},
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "2450:1:19",
																				"type": "",
																				"value": "1"
																			}
																		],
																		"functionName": {
																			"name": "shl",
																			"nodeType": "YulIdentifier",
																			"src": "2441:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "2441:11:19"
																	},
																	{
																		"kind": "number",
																		"nodeType": "YulLiteral",
																		"src": "2454:1:19",
																		"type": "",
																		"value": "1"
																	}
																],
																"functionName": {
																	"name": "sub",
																	"nodeType": "YulIdentifier",
																	"src": "2437:3:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "2437:19:19"
															}
														],
														"functionName": {
															"name": "and",
															"nodeType": "YulIdentifier",
															"src": "2425:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "2425:32:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "2407:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "2407:51:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "2407:51:19"
										}
									]
								},
								"name": "abi_encode_tuple_t_contract$_Fanout_$4823__to_t_address_payable__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "2331:9:19",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "2342:6:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "2353:4:19",
										"type": ""
									}
								],
								"src": "2238:226:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2586:102:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "2596:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "2608:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "2619:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "2604:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "2604:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "2596:4:19"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "2638:9:19"
													},
													{
														"arguments": [
															{
																"name": "value0",
																"nodeType": "YulIdentifier",
																"src": "2653:6:19"
															},
															{
																"arguments": [
																	{
																		"arguments": [
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "2669:3:19",
																				"type": "",
																				"value": "160"
																			},
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "2674:1:19",
																				"type": "",
																				"value": "1"
																			}
																		],
																		"functionName": {
																			"name": "shl",
																			"nodeType": "YulIdentifier",
																			"src": "2665:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "2665:11:19"
																	},
																	{
																		"kind": "number",
																		"nodeType": "YulLiteral",
																		"src": "2678:1:19",
																		"type": "",
																		"value": "1"
																	}
																],
																"functionName": {
																	"name": "sub",
																	"nodeType": "YulIdentifier",
																	"src": "2661:3:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "2661:19:19"
															}
														],
														"functionName": {
															"name": "and",
															"nodeType": "YulIdentifier",
															"src": "2649:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "2649:32:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "2631:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "2631:51:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "2631:51:19"
										}
									]
								},
								"name": "abi_encode_tuple_t_address_payable__to_t_address_payable__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "2555:9:19",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "2566:6:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "2577:4:19",
										"type": ""
									}
								],
								"src": "2469:219:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2806:102:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "2816:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "2828:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "2839:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "2824:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "2824:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "2816:4:19"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "2858:9:19"
													},
													{
														"arguments": [
															{
																"name": "value0",
																"nodeType": "YulIdentifier",
																"src": "2873:6:19"
															},
															{
																"arguments": [
																	{
																		"arguments": [
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "2889:3:19",
																				"type": "",
																				"value": "160"
																			},
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "2894:1:19",
																				"type": "",
																				"value": "1"
																			}
																		],
																		"functionName": {
																			"name": "shl",
																			"nodeType": "YulIdentifier",
																			"src": "2885:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "2885:11:19"
																	},
																	{
																		"kind": "number",
																		"nodeType": "YulLiteral",
																		"src": "2898:1:19",
																		"type": "",
																		"value": "1"
																	}
																],
																"functionName": {
																	"name": "sub",
																	"nodeType": "YulIdentifier",
																	"src": "2881:3:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "2881:19:19"
															}
														],
														"functionName": {
															"name": "and",
															"nodeType": "YulIdentifier",
															"src": "2869:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "2869:32:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "2851:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "2851:51:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "2851:51:19"
										}
									]
								},
								"name": "abi_encode_tuple_t_contract$_J3d_$5437__to_t_address__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "2775:9:19",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "2786:6:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "2797:4:19",
										"type": ""
									}
								],
								"src": "2693:215:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "3014:102:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "3024:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "3036:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3047:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "3032:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "3032:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "3024:4:19"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "3066:9:19"
													},
													{
														"arguments": [
															{
																"name": "value0",
																"nodeType": "YulIdentifier",
																"src": "3081:6:19"
															},
															{
																"arguments": [
																	{
																		"arguments": [
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "3097:3:19",
																				"type": "",
																				"value": "160"
																			},
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "3102:1:19",
																				"type": "",
																				"value": "1"
																			}
																		],
																		"functionName": {
																			"name": "shl",
																			"nodeType": "YulIdentifier",
																			"src": "3093:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "3093:11:19"
																	},
																	{
																		"kind": "number",
																		"nodeType": "YulLiteral",
																		"src": "3106:1:19",
																		"type": "",
																		"value": "1"
																	}
																],
																"functionName": {
																	"name": "sub",
																	"nodeType": "YulIdentifier",
																	"src": "3089:3:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "3089:19:19"
															}
														],
														"functionName": {
															"name": "and",
															"nodeType": "YulIdentifier",
															"src": "3077:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "3077:32:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "3059:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "3059:51:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "3059:51:19"
										}
									]
								},
								"name": "abi_encode_tuple_t_address__to_t_address__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "2983:9:19",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "2994:6:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "3005:4:19",
										"type": ""
									}
								],
								"src": "2913:203:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "3295:151:19",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "3312:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3323:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "3305:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "3305:21:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "3305:21:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "3346:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "3357:2:19",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "3342:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "3342:18:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3362:1:19",
														"type": "",
														"value": "2"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "3335:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "3335:29:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "3335:29:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "3384:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "3395:2:19",
																"type": "",
																"value": "64"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "3380:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "3380:18:19"
													},
													{
														"hexValue": "6e6f",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "3400:4:19",
														"type": "",
														"value": "no"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "3373:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "3373:32:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "3373:32:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "3414:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "3426:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3437:2:19",
														"type": "",
														"value": "96"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "3422:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "3422:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "3414:4:19"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "3272:9:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "3286:4:19",
										"type": ""
									}
								],
								"src": "3121:325:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "3506:325:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "3516:22:19",
											"value": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3530:1:19",
														"type": "",
														"value": "1"
													},
													{
														"name": "data",
														"nodeType": "YulIdentifier",
														"src": "3533:4:19"
													}
												],
												"functionName": {
													"name": "shr",
													"nodeType": "YulIdentifier",
													"src": "3526:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "3526:12:19"
											},
											"variableNames": [
												{
													"name": "length",
													"nodeType": "YulIdentifier",
													"src": "3516:6:19"
												}
											]
										},
										{
											"nodeType": "YulVariableDeclaration",
											"src": "3547:38:19",
											"value": {
												"arguments": [
													{
														"name": "data",
														"nodeType": "YulIdentifier",
														"src": "3577:4:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3583:1:19",
														"type": "",
														"value": "1"
													}
												],
												"functionName": {
													"name": "and",
													"nodeType": "YulIdentifier",
													"src": "3573:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "3573:12:19"
											},
											"variables": [
												{
													"name": "outOfPlaceEncoding",
													"nodeType": "YulTypedName",
													"src": "3551:18:19",
													"type": ""
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "3624:31:19",
												"statements": [
													{
														"nodeType": "YulAssignment",
														"src": "3626:27:19",
														"value": {
															"arguments": [
																{
																	"name": "length",
																	"nodeType": "YulIdentifier",
																	"src": "3640:6:19"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "3648:4:19",
																	"type": "",
																	"value": "0x7f"
																}
															],
															"functionName": {
																"name": "and",
																"nodeType": "YulIdentifier",
																"src": "3636:3:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "3636:17:19"
														},
														"variableNames": [
															{
																"name": "length",
																"nodeType": "YulIdentifier",
																"src": "3626:6:19"
															}
														]
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "outOfPlaceEncoding",
														"nodeType": "YulIdentifier",
														"src": "3604:18:19"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "3597:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "3597:26:19"
											},
											"nodeType": "YulIf",
											"src": "3594:61:19"
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "3714:111:19",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "3735:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"arguments": [
																		{
																			"kind": "number",
																			"nodeType": "YulLiteral",
																			"src": "3742:3:19",
																			"type": "",
																			"value": "224"
																		},
																		{
																			"kind": "number",
																			"nodeType": "YulLiteral",
																			"src": "3747:10:19",
																			"type": "",
																			"value": "0x4e487b71"
																		}
																	],
																	"functionName": {
																		"name": "shl",
																		"nodeType": "YulIdentifier",
																		"src": "3738:3:19"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "3738:20:19"
																}
															],
															"functionName": {
																"name": "mstore",
																"nodeType": "YulIdentifier",
																"src": "3728:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "3728:31:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "3728:31:19"
													},
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "3779:1:19",
																	"type": "",
																	"value": "4"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "3782:4:19",
																	"type": "",
																	"value": "0x22"
																}
															],
															"functionName": {
																"name": "mstore",
																"nodeType": "YulIdentifier",
																"src": "3772:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "3772:15:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "3772:15:19"
													},
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "3807:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "3810:4:19",
																	"type": "",
																	"value": "0x24"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "3800:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "3800:15:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "3800:15:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "outOfPlaceEncoding",
														"nodeType": "YulIdentifier",
														"src": "3670:18:19"
													},
													{
														"arguments": [
															{
																"name": "length",
																"nodeType": "YulIdentifier",
																"src": "3693:6:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "3701:2:19",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "lt",
															"nodeType": "YulIdentifier",
															"src": "3690:2:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "3690:14:19"
													}
												],
												"functionName": {
													"name": "eq",
													"nodeType": "YulIdentifier",
													"src": "3667:2:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "3667:38:19"
											},
											"nodeType": "YulIf",
											"src": "3664:161:19"
										}
									]
								},
								"name": "extract_byte_array_length",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "data",
										"nodeType": "YulTypedName",
										"src": "3486:4:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "length",
										"nodeType": "YulTypedName",
										"src": "3495:6:19",
										"type": ""
									}
								],
								"src": "3451:380:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "4010:160:19",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "4027:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4038:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "4020:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "4020:21:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4020:21:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "4061:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "4072:2:19",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "4057:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "4057:18:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4077:2:19",
														"type": "",
														"value": "10"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "4050:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "4050:30:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4050:30:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "4100:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "4111:2:19",
																"type": "",
																"value": "64"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "4096:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "4096:18:19"
													},
													{
														"hexValue": "62616420647265616d73",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "4116:12:19",
														"type": "",
														"value": "bad dreams"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "4089:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "4089:40:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4089:40:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "4138:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "4150:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4161:2:19",
														"type": "",
														"value": "96"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "4146:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "4146:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "4138:4:19"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_stringliteral_e2a1e738e2d231a4c0e05575155ac1c8c0cd8d6b7e91617fd1b5a419c73aca2c__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "3987:9:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "4001:4:19",
										"type": ""
									}
								],
								"src": "3836:334:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "4256:103:19",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "4302:16:19",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "4311:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "4314:1:19",
																	"type": "",
																	"value": "0"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "4304:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "4304:12:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "4304:12:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "4277:7:19"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "4286:9:19"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "4273:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "4273:23:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4298:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "slt",
													"nodeType": "YulIdentifier",
													"src": "4269:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "4269:32:19"
											},
											"nodeType": "YulIf",
											"src": "4266:52:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "4327:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "4343:9:19"
													}
												],
												"functionName": {
													"name": "mload",
													"nodeType": "YulIdentifier",
													"src": "4337:5:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "4337:16:19"
											},
											"variableNames": [
												{
													"name": "value0",
													"nodeType": "YulIdentifier",
													"src": "4327:6:19"
												}
											]
										}
									]
								},
								"name": "abi_decode_tuple_t_uint256_fromMemory",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "4222:9:19",
										"type": ""
									},
									{
										"name": "dataEnd",
										"nodeType": "YulTypedName",
										"src": "4233:7:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "4245:6:19",
										"type": ""
									}
								],
								"src": "4175:184:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "4538:162:19",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "4555:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4566:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "4548:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "4548:21:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4548:21:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "4589:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "4600:2:19",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "4585:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "4585:18:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4605:2:19",
														"type": "",
														"value": "12"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "4578:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "4578:30:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4578:30:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "4628:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "4639:2:19",
																"type": "",
																"value": "64"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "4624:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "4624:18:19"
													},
													{
														"hexValue": "63616e2774206166666f7264",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "4644:14:19",
														"type": "",
														"value": "can't afford"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "4617:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "4617:42:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4617:42:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "4668:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "4680:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4691:2:19",
														"type": "",
														"value": "96"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "4676:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "4676:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "4668:4:19"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_stringliteral_dfc0c2a86ca97a3be5ef2e0e08cdd76e7eeb73c8ef35b45c84547790e2b1a0b3__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "4515:9:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "4529:4:19",
										"type": ""
									}
								],
								"src": "4364:336:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "4879:156:19",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "4896:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4907:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "4889:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "4889:21:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4889:21:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "4930:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "4941:2:19",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "4926:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "4926:18:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4946:1:19",
														"type": "",
														"value": "7"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "4919:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "4919:29:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4919:29:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "4968:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "4979:2:19",
																"type": "",
																"value": "64"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "4964:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "4964:18:19"
													},
													{
														"hexValue": "6261647465616d",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "4984:9:19",
														"type": "",
														"value": "badteam"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "4957:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "4957:37:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4957:37:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "5003:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "5015:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "5026:2:19",
														"type": "",
														"value": "96"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "5011:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "5011:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "5003:4:19"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_stringliteral_74c6ac64113c77c5db7f403e306ca178ee70ad85cbe5d196a73afc7ca47a0304__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "4856:9:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "4870:4:19",
										"type": ""
									}
								],
								"src": "4705:330:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "5072:95:19",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "5089:1:19",
														"type": "",
														"value": "0"
													},
													{
														"arguments": [
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "5096:3:19",
																"type": "",
																"value": "224"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "5101:10:19",
																"type": "",
																"value": "0x4e487b71"
															}
														],
														"functionName": {
															"name": "shl",
															"nodeType": "YulIdentifier",
															"src": "5092:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "5092:20:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "5082:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "5082:31:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "5082:31:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "5129:1:19",
														"type": "",
														"value": "4"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "5132:4:19",
														"type": "",
														"value": "0x11"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "5122:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "5122:15:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "5122:15:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "5153:1:19",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "5156:4:19",
														"type": "",
														"value": "0x24"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "5146:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "5146:15:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "5146:15:19"
										}
									]
								},
								"name": "panic_error_0x11",
								"nodeType": "YulFunctionDefinition",
								"src": "5040:127:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "5218:171:19",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "5249:111:19",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "5270:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"arguments": [
																		{
																			"kind": "number",
																			"nodeType": "YulLiteral",
																			"src": "5277:3:19",
																			"type": "",
																			"value": "224"
																		},
																		{
																			"kind": "number",
																			"nodeType": "YulLiteral",
																			"src": "5282:10:19",
																			"type": "",
																			"value": "0x4e487b71"
																		}
																	],
																	"functionName": {
																		"name": "shl",
																		"nodeType": "YulIdentifier",
																		"src": "5273:3:19"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "5273:20:19"
																}
															],
															"functionName": {
																"name": "mstore",
																"nodeType": "YulIdentifier",
																"src": "5263:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "5263:31:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "5263:31:19"
													},
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "5314:1:19",
																	"type": "",
																	"value": "4"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "5317:4:19",
																	"type": "",
																	"value": "0x12"
																}
															],
															"functionName": {
																"name": "mstore",
																"nodeType": "YulIdentifier",
																"src": "5307:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "5307:15:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "5307:15:19"
													},
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "5342:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "5345:4:19",
																	"type": "",
																	"value": "0x24"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "5335:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "5335:15:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "5335:15:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "5238:1:19"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "5231:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "5231:9:19"
											},
											"nodeType": "YulIf",
											"src": "5228:132:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "5369:14:19",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "5378:1:19"
													},
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "5381:1:19"
													}
												],
												"functionName": {
													"name": "div",
													"nodeType": "YulIdentifier",
													"src": "5374:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "5374:9:19"
											},
											"variableNames": [
												{
													"name": "r",
													"nodeType": "YulIdentifier",
													"src": "5369:1:19"
												}
											]
										}
									]
								},
								"name": "checked_div_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "x",
										"nodeType": "YulTypedName",
										"src": "5203:1:19",
										"type": ""
									},
									{
										"name": "y",
										"nodeType": "YulTypedName",
										"src": "5206:1:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "r",
										"nodeType": "YulTypedName",
										"src": "5212:1:19",
										"type": ""
									}
								],
								"src": "5172:217:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "5446:116:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "5456:20:19",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "5471:1:19"
													},
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "5474:1:19"
													}
												],
												"functionName": {
													"name": "mul",
													"nodeType": "YulIdentifier",
													"src": "5467:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "5467:9:19"
											},
											"variableNames": [
												{
													"name": "product",
													"nodeType": "YulIdentifier",
													"src": "5456:7:19"
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "5534:22:19",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x11",
																"nodeType": "YulIdentifier",
																"src": "5536:16:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "5536:18:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "5536:18:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "x",
																		"nodeType": "YulIdentifier",
																		"src": "5505:1:19"
																	}
																],
																"functionName": {
																	"name": "iszero",
																	"nodeType": "YulIdentifier",
																	"src": "5498:6:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "5498:9:19"
															},
															{
																"arguments": [
																	{
																		"name": "y",
																		"nodeType": "YulIdentifier",
																		"src": "5512:1:19"
																	},
																	{
																		"arguments": [
																			{
																				"name": "product",
																				"nodeType": "YulIdentifier",
																				"src": "5519:7:19"
																			},
																			{
																				"name": "x",
																				"nodeType": "YulIdentifier",
																				"src": "5528:1:19"
																			}
																		],
																		"functionName": {
																			"name": "div",
																			"nodeType": "YulIdentifier",
																			"src": "5515:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "5515:15:19"
																	}
																],
																"functionName": {
																	"name": "eq",
																	"nodeType": "YulIdentifier",
																	"src": "5509:2:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "5509:22:19"
															}
														],
														"functionName": {
															"name": "or",
															"nodeType": "YulIdentifier",
															"src": "5495:2:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "5495:37:19"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "5488:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "5488:45:19"
											},
											"nodeType": "YulIf",
											"src": "5485:71:19"
										}
									]
								},
								"name": "checked_mul_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "x",
										"nodeType": "YulTypedName",
										"src": "5425:1:19",
										"type": ""
									},
									{
										"name": "y",
										"nodeType": "YulTypedName",
										"src": "5428:1:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "product",
										"nodeType": "YulTypedName",
										"src": "5434:7:19",
										"type": ""
									}
								],
								"src": "5394:168:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "5758:14:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "5760:10:19",
											"value": {
												"name": "pos",
												"nodeType": "YulIdentifier",
												"src": "5767:3:19"
											},
											"variableNames": [
												{
													"name": "end",
													"nodeType": "YulIdentifier",
													"src": "5760:3:19"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "5742:3:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "5750:3:19",
										"type": ""
									}
								],
								"src": "5567:205:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "5934:188:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "5944:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "5956:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "5967:2:19",
														"type": "",
														"value": "96"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "5952:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "5952:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "5944:4:19"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "5986:9:19"
													},
													{
														"arguments": [
															{
																"name": "value0",
																"nodeType": "YulIdentifier",
																"src": "6001:6:19"
															},
															{
																"arguments": [
																	{
																		"arguments": [
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "6017:3:19",
																				"type": "",
																				"value": "160"
																			},
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "6022:1:19",
																				"type": "",
																				"value": "1"
																			}
																		],
																		"functionName": {
																			"name": "shl",
																			"nodeType": "YulIdentifier",
																			"src": "6013:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "6013:11:19"
																	},
																	{
																		"kind": "number",
																		"nodeType": "YulLiteral",
																		"src": "6026:1:19",
																		"type": "",
																		"value": "1"
																	}
																],
																"functionName": {
																	"name": "sub",
																	"nodeType": "YulIdentifier",
																	"src": "6009:3:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "6009:19:19"
															}
														],
														"functionName": {
															"name": "and",
															"nodeType": "YulIdentifier",
															"src": "5997:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "5997:32:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "5979:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "5979:51:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "5979:51:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "6050:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "6061:2:19",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "6046:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "6046:18:19"
													},
													{
														"name": "value1",
														"nodeType": "YulIdentifier",
														"src": "6066:6:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "6039:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "6039:34:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "6039:34:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "6093:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "6104:2:19",
																"type": "",
																"value": "64"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "6089:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "6089:18:19"
													},
													{
														"name": "value2",
														"nodeType": "YulIdentifier",
														"src": "6109:6:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "6082:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "6082:34:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "6082:34:19"
										}
									]
								},
								"name": "abi_encode_tuple_t_address_t_uint256_t_uint256__to_t_address_t_uint256_t_uint256__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "5887:9:19",
										"type": ""
									},
									{
										"name": "value2",
										"nodeType": "YulTypedName",
										"src": "5898:6:19",
										"type": ""
									},
									{
										"name": "value1",
										"nodeType": "YulTypedName",
										"src": "5906:6:19",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "5914:6:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "5925:4:19",
										"type": ""
									}
								],
								"src": "5777:345:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "6205:199:19",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "6251:16:19",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "6260:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "6263:1:19",
																	"type": "",
																	"value": "0"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "6253:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "6253:12:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "6253:12:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "6226:7:19"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "6235:9:19"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "6222:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "6222:23:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6247:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "slt",
													"nodeType": "YulIdentifier",
													"src": "6218:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "6218:32:19"
											},
											"nodeType": "YulIf",
											"src": "6215:52:19"
										},
										{
											"nodeType": "YulVariableDeclaration",
											"src": "6276:29:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "6295:9:19"
													}
												],
												"functionName": {
													"name": "mload",
													"nodeType": "YulIdentifier",
													"src": "6289:5:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "6289:16:19"
											},
											"variables": [
												{
													"name": "value",
													"nodeType": "YulTypedName",
													"src": "6280:5:19",
													"type": ""
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "6358:16:19",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "6367:1:19",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "6370:1:19",
																	"type": "",
																	"value": "0"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "6360:6:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "6360:12:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "6360:12:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "6327:5:19"
															},
															{
																"arguments": [
																	{
																		"arguments": [
																			{
																				"name": "value",
																				"nodeType": "YulIdentifier",
																				"src": "6348:5:19"
																			}
																		],
																		"functionName": {
																			"name": "iszero",
																			"nodeType": "YulIdentifier",
																			"src": "6341:6:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "6341:13:19"
																	}
																],
																"functionName": {
																	"name": "iszero",
																	"nodeType": "YulIdentifier",
																	"src": "6334:6:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "6334:21:19"
															}
														],
														"functionName": {
															"name": "eq",
															"nodeType": "YulIdentifier",
															"src": "6324:2:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "6324:32:19"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "6317:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "6317:40:19"
											},
											"nodeType": "YulIf",
											"src": "6314:60:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "6383:15:19",
											"value": {
												"name": "value",
												"nodeType": "YulIdentifier",
												"src": "6393:5:19"
											},
											"variableNames": [
												{
													"name": "value0",
													"nodeType": "YulIdentifier",
													"src": "6383:6:19"
												}
											]
										}
									]
								},
								"name": "abi_decode_tuple_t_bool_fromMemory",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "6171:9:19",
										"type": ""
									},
									{
										"name": "dataEnd",
										"nodeType": "YulTypedName",
										"src": "6182:7:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "6194:6:19",
										"type": ""
									}
								],
								"src": "6127:277:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "6456:88:19",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "6487:22:19",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x11",
																"nodeType": "YulIdentifier",
																"src": "6489:16:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "6489:18:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "6489:18:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "6472:5:19"
													},
													{
														"arguments": [
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "6483:1:19",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "not",
															"nodeType": "YulIdentifier",
															"src": "6479:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "6479:6:19"
													}
												],
												"functionName": {
													"name": "eq",
													"nodeType": "YulIdentifier",
													"src": "6469:2:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "6469:17:19"
											},
											"nodeType": "YulIf",
											"src": "6466:43:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "6518:20:19",
											"value": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "6529:5:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6536:1:19",
														"type": "",
														"value": "1"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "6525:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "6525:13:19"
											},
											"variableNames": [
												{
													"name": "ret",
													"nodeType": "YulIdentifier",
													"src": "6518:3:19"
												}
											]
										}
									]
								},
								"name": "increment_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "6438:5:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "ret",
										"nodeType": "YulTypedName",
										"src": "6448:3:19",
										"type": ""
									}
								],
								"src": "6409:135:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "6597:77:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "6607:16:19",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "6618:1:19"
													},
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "6621:1:19"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "6614:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "6614:9:19"
											},
											"variableNames": [
												{
													"name": "sum",
													"nodeType": "YulIdentifier",
													"src": "6607:3:19"
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "6646:22:19",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x11",
																"nodeType": "YulIdentifier",
																"src": "6648:16:19"
															},
															"nodeType": "YulFunctionCall",
															"src": "6648:18:19"
														},
														"nodeType": "YulExpressionStatement",
														"src": "6648:18:19"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "6638:1:19"
													},
													{
														"name": "sum",
														"nodeType": "YulIdentifier",
														"src": "6641:3:19"
													}
												],
												"functionName": {
													"name": "gt",
													"nodeType": "YulIdentifier",
													"src": "6635:2:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "6635:10:19"
											},
											"nodeType": "YulIf",
											"src": "6632:36:19"
										}
									]
								},
								"name": "checked_add_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "x",
										"nodeType": "YulTypedName",
										"src": "6580:1:19",
										"type": ""
									},
									{
										"name": "y",
										"nodeType": "YulTypedName",
										"src": "6583:1:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "sum",
										"nodeType": "YulTypedName",
										"src": "6589:3:19",
										"type": ""
									}
								],
								"src": "6549:125:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "6853:157:19",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "6870:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6881:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "6863:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "6863:21:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "6863:21:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "6904:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "6915:2:19",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "6900:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "6900:18:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6920:1:19",
														"type": "",
														"value": "8"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "6893:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "6893:29:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "6893:29:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "6942:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "6953:2:19",
																"type": "",
																"value": "64"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "6938:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "6938:18:19"
													},
													{
														"hexValue": "626164207465616d",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "6958:10:19",
														"type": "",
														"value": "bad team"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "6931:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "6931:38:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "6931:38:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "6978:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "6990:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "7001:2:19",
														"type": "",
														"value": "96"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "6986:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "6986:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "6978:4:19"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_stringliteral_b26c376d11400a621f577fbee397d0e0d91c5e11fac6ea73a2358c79152af489__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "6830:9:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "6844:4:19",
										"type": ""
									}
								],
								"src": "6679:331:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "7144:145:19",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "7154:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "7166:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "7177:2:19",
														"type": "",
														"value": "64"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "7162:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "7162:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "7154:4:19"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "7196:9:19"
													},
													{
														"arguments": [
															{
																"name": "value0",
																"nodeType": "YulIdentifier",
																"src": "7211:6:19"
															},
															{
																"arguments": [
																	{
																		"arguments": [
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "7227:3:19",
																				"type": "",
																				"value": "160"
																			},
																			{
																				"kind": "number",
																				"nodeType": "YulLiteral",
																				"src": "7232:1:19",
																				"type": "",
																				"value": "1"
																			}
																		],
																		"functionName": {
																			"name": "shl",
																			"nodeType": "YulIdentifier",
																			"src": "7223:3:19"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "7223:11:19"
																	},
																	{
																		"kind": "number",
																		"nodeType": "YulLiteral",
																		"src": "7236:1:19",
																		"type": "",
																		"value": "1"
																	}
																],
																"functionName": {
																	"name": "sub",
																	"nodeType": "YulIdentifier",
																	"src": "7219:3:19"
																},
																"nodeType": "YulFunctionCall",
																"src": "7219:19:19"
															}
														],
														"functionName": {
															"name": "and",
															"nodeType": "YulIdentifier",
															"src": "7207:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "7207:32:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "7189:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "7189:51:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "7189:51:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "7260:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "7271:2:19",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "7256:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "7256:18:19"
													},
													{
														"name": "value1",
														"nodeType": "YulIdentifier",
														"src": "7276:6:19"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "7249:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "7249:34:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "7249:34:19"
										}
									]
								},
								"name": "abi_encode_tuple_t_address_t_uint256__to_t_address_t_uint256__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "7105:9:19",
										"type": ""
									},
									{
										"name": "value1",
										"nodeType": "YulTypedName",
										"src": "7116:6:19",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "7124:6:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "7135:4:19",
										"type": ""
									}
								],
								"src": "7015:274:19"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "7468:166:19",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "7485:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "7496:2:19",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "7478:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "7478:21:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "7478:21:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "7519:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "7530:2:19",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "7515:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "7515:18:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "7535:2:19",
														"type": "",
														"value": "16"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "7508:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "7508:30:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "7508:30:19"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "7558:9:19"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "7569:2:19",
																"type": "",
																"value": "64"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "7554:3:19"
														},
														"nodeType": "YulFunctionCall",
														"src": "7554:18:19"
													},
													{
														"hexValue": "6e6f742074696d65207061646177616e",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "7574:18:19",
														"type": "",
														"value": "not time padawan"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "7547:6:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "7547:46:19"
											},
											"nodeType": "YulExpressionStatement",
											"src": "7547:46:19"
										},
										{
											"nodeType": "YulAssignment",
											"src": "7602:26:19",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "7614:9:19"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "7625:2:19",
														"type": "",
														"value": "96"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "7610:3:19"
												},
												"nodeType": "YulFunctionCall",
												"src": "7610:18:19"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "7602:4:19"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_stringliteral_e709923cd19cdd8e337bc7230f9abbf596a88739ed5fc4ba10e63af263236301__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "7445:9:19",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "7459:4:19",
										"type": ""
									}
								],
								"src": "7294:340:19"
							}
						]
					},
					"contents": "{\n    { }\n    function abi_decode_address(offset) -> value\n    {\n        value := calldataload(offset)\n        if iszero(eq(value, and(value, sub(shl(160, 1), 1)))) { revert(0, 0) }\n    }\n    function abi_decode_tuple_t_addresst_addresst_addresst_address(headStart, dataEnd) -> value0, value1, value2, value3\n    {\n        if slt(sub(dataEnd, headStart), 128) { revert(0, 0) }\n        value0 := abi_decode_address(headStart)\n        value1 := abi_decode_address(add(headStart, 32))\n        value2 := abi_decode_address(add(headStart, 64))\n        value3 := abi_decode_address(add(headStart, 96))\n    }\n    function abi_encode_tuple_t_contract$_NFTFanout_$5177__to_t_address_payable__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, and(value0, sub(shl(160, 1), 1)))\n    }\n    function abi_encode_tuple_t_contract$_GameItem_$4951__to_t_address__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, and(value0, sub(shl(160, 1), 1)))\n    }\n    function abi_decode_tuple_t_uint256(headStart, dataEnd) -> value0\n    {\n        if slt(sub(dataEnd, headStart), 32) { revert(0, 0) }\n        value0 := calldataload(headStart)\n    }\n    function abi_encode_tuple_t_string_memory_ptr__to_t_string_memory_ptr__fromStack_reversed(headStart, value0) -> tail\n    {\n        let _1 := 32\n        mstore(headStart, _1)\n        let length := mload(value0)\n        mstore(add(headStart, _1), length)\n        let i := 0\n        for { } lt(i, length) { i := add(i, _1) }\n        {\n            mstore(add(add(headStart, i), 64), mload(add(add(value0, i), _1)))\n        }\n        mstore(add(add(headStart, length), 64), 0)\n        tail := add(add(headStart, and(add(length, 31), not(31))), 64)\n    }\n    function abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, value0)\n    }\n    function abi_decode_tuple_t_uint256t_uint256(headStart, dataEnd) -> value0, value1\n    {\n        if slt(sub(dataEnd, headStart), 64) { revert(0, 0) }\n        value0 := calldataload(headStart)\n        value1 := calldataload(add(headStart, 32))\n    }\n    function abi_encode_tuple_t_contract$_Fanout_$4823__to_t_address_payable__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, and(value0, sub(shl(160, 1), 1)))\n    }\n    function abi_encode_tuple_t_address_payable__to_t_address_payable__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, and(value0, sub(shl(160, 1), 1)))\n    }\n    function abi_encode_tuple_t_contract$_J3d_$5437__to_t_address__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, and(value0, sub(shl(160, 1), 1)))\n    }\n    function abi_encode_tuple_t_address__to_t_address__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, and(value0, sub(shl(160, 1), 1)))\n    }\n    function abi_encode_tuple_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba__to_t_string_memory_ptr__fromStack_reversed(headStart) -> tail\n    {\n        mstore(headStart, 32)\n        mstore(add(headStart, 32), 2)\n        mstore(add(headStart, 64), \"no\")\n        tail := add(headStart, 96)\n    }\n    function extract_byte_array_length(data) -> length\n    {\n        length := shr(1, data)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) { length := and(length, 0x7f) }\n        if eq(outOfPlaceEncoding, lt(length, 32))\n        {\n            mstore(0, shl(224, 0x4e487b71))\n            mstore(4, 0x22)\n            revert(0, 0x24)\n        }\n    }\n    function abi_encode_tuple_t_stringliteral_e2a1e738e2d231a4c0e05575155ac1c8c0cd8d6b7e91617fd1b5a419c73aca2c__to_t_string_memory_ptr__fromStack_reversed(headStart) -> tail\n    {\n        mstore(headStart, 32)\n        mstore(add(headStart, 32), 10)\n        mstore(add(headStart, 64), \"bad dreams\")\n        tail := add(headStart, 96)\n    }\n    function abi_decode_tuple_t_uint256_fromMemory(headStart, dataEnd) -> value0\n    {\n        if slt(sub(dataEnd, headStart), 32) { revert(0, 0) }\n        value0 := mload(headStart)\n    }\n    function abi_encode_tuple_t_stringliteral_dfc0c2a86ca97a3be5ef2e0e08cdd76e7eeb73c8ef35b45c84547790e2b1a0b3__to_t_string_memory_ptr__fromStack_reversed(headStart) -> tail\n    {\n        mstore(headStart, 32)\n        mstore(add(headStart, 32), 12)\n        mstore(add(headStart, 64), \"can't afford\")\n        tail := add(headStart, 96)\n    }\n    function abi_encode_tuple_t_stringliteral_74c6ac64113c77c5db7f403e306ca178ee70ad85cbe5d196a73afc7ca47a0304__to_t_string_memory_ptr__fromStack_reversed(headStart) -> tail\n    {\n        mstore(headStart, 32)\n        mstore(add(headStart, 32), 7)\n        mstore(add(headStart, 64), \"badteam\")\n        tail := add(headStart, 96)\n    }\n    function panic_error_0x11()\n    {\n        mstore(0, shl(224, 0x4e487b71))\n        mstore(4, 0x11)\n        revert(0, 0x24)\n    }\n    function checked_div_t_uint256(x, y) -> r\n    {\n        if iszero(y)\n        {\n            mstore(0, shl(224, 0x4e487b71))\n            mstore(4, 0x12)\n            revert(0, 0x24)\n        }\n        r := div(x, y)\n    }\n    function checked_mul_t_uint256(x, y) -> product\n    {\n        product := mul(x, y)\n        if iszero(or(iszero(x), eq(y, div(product, x)))) { panic_error_0x11() }\n    }\n    function abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed(pos) -> end\n    { end := pos }\n    function abi_encode_tuple_t_address_t_uint256_t_uint256__to_t_address_t_uint256_t_uint256__fromStack_reversed(headStart, value2, value1, value0) -> tail\n    {\n        tail := add(headStart, 96)\n        mstore(headStart, and(value0, sub(shl(160, 1), 1)))\n        mstore(add(headStart, 32), value1)\n        mstore(add(headStart, 64), value2)\n    }\n    function abi_decode_tuple_t_bool_fromMemory(headStart, dataEnd) -> value0\n    {\n        if slt(sub(dataEnd, headStart), 32) { revert(0, 0) }\n        let value := mload(headStart)\n        if iszero(eq(value, iszero(iszero(value)))) { revert(0, 0) }\n        value0 := value\n    }\n    function increment_t_uint256(value) -> ret\n    {\n        if eq(value, not(0)) { panic_error_0x11() }\n        ret := add(value, 1)\n    }\n    function checked_add_t_uint256(x, y) -> sum\n    {\n        sum := add(x, y)\n        if gt(x, sum) { panic_error_0x11() }\n    }\n    function abi_encode_tuple_t_stringliteral_b26c376d11400a621f577fbee397d0e0d91c5e11fac6ea73a2358c79152af489__to_t_string_memory_ptr__fromStack_reversed(headStart) -> tail\n    {\n        mstore(headStart, 32)\n        mstore(add(headStart, 32), 8)\n        mstore(add(headStart, 64), \"bad team\")\n        tail := add(headStart, 96)\n    }\n    function abi_encode_tuple_t_address_t_uint256__to_t_address_t_uint256__fromStack_reversed(headStart, value1, value0) -> tail\n    {\n        tail := add(headStart, 64)\n        mstore(headStart, and(value0, sub(shl(160, 1), 1)))\n        mstore(add(headStart, 32), value1)\n    }\n    function abi_encode_tuple_t_stringliteral_e709923cd19cdd8e337bc7230f9abbf596a88739ed5fc4ba10e63af263236301__to_t_string_memory_ptr__fromStack_reversed(headStart) -> tail\n    {\n        mstore(headStart, 32)\n        mstore(add(headStart, 32), 16)\n        mstore(add(headStart, 64), \"not time padawan\")\n        tail := add(headStart, 96)\n    }\n}",
					"id": 19,
					"language": "Yul",
					"name": "#utility.yul"
				}
			],
			"immutableReferences": {},
			"linkReferences": {},
			"object": "6080604052600436106100fe5760003560e01c806388c9cb3c11610095578063b390c0ab11610064578063b390c0ab1461027b578063b9425dad1461029b578063c7876ea4146102bb578063d4114afb146102d1578063dfbf53ae146102e657600080fd5b806388c9cb3c1461021c5780638da5cb5b146102325780639d40a1af14610252578063a035b1fe1461026557600080fd5b80634ba2363a116100d15780634ba2363a146101af5780635b1687b0146101d35780635d7ceb12146101e657806371722f0a1461020657600080fd5b806335633b19146101035780633697615f146101255780633943380c146101625780633ed2b77a14610182575b600080fd5b34801561010f57600080fd5b5061012361011e366004610ded565b610306565b005b34801561013157600080fd5b50600954610145906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561016e57600080fd5b50600554610145906001600160a01b031681565b34801561018e57600080fd5b506101a261019d366004610e41565b610393565b6040516101599190610e5a565b3480156101bb57600080fd5b506101c560015481565b604051908152602001610159565b6101236101e1366004610ea8565b61043f565b3480156101f257600080fd5b50600a54610145906001600160a01b031681565b34801561021257600080fd5b506101c560075481565b34801561022857600080fd5b506101c560025481565b34801561023e57600080fd5b50600354610145906001600160a01b031681565b610123610260366004610ea8565b610796565b34801561027157600080fd5b506101c560005481565b34801561028757600080fd5b50610123610296366004610ea8565b610ad0565b3480156102a757600080fd5b50600b54610145906001600160a01b031681565b3480156102c757600080fd5b506101c560065481565b3480156102dd57600080fd5b50610123610ba9565b3480156102f257600080fd5b50600454610145906001600160a01b031681565b73791f1cfb231e7c75eee4b7f8913e3c2b3548eb9333146103535760405162461bcd60e51b81526020600482015260026024820152616e6f60f01b60448201526064015b60405180910390fd5b600980546001600160a01b039485166001600160a01b031991821617909155600a805493851693821693909317909255600b805491909316911617905550565b600881815481106103a357600080fd5b9060005260206000200160009150905080546103be90610eca565b80601f01602080910402602001604051908101604052809291908181526020018280546103ea90610eca565b80156104375780601f1061040c57610100808354040283529160200191610437565b820191906000526020600020905b81548152906001019060200180831161041a57829003601f168201915b505050505081565b60008211801561045b57506c7e37be2022c0914b268000000082105b6104945760405162461bcd60e51b815260206004820152600a60248201526962616420647265616d7360b01b604482015260640161034a565b600b5460405163ae10426560e01b8152600481018490526001600160a01b039091169063ae10426590602401602060405180830381865afa1580156104dd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105019190610f04565b60008190553410156105445760405162461bcd60e51b815260206004820152600c60248201526b18d85b89dd081859999bdc9960a21b604482015260640161034a565b600081118015610555575060048111155b61058b5760405162461bcd60e51b81526020600482015260076024820152666261647465616d60c81b604482015260640161034a565b600080826001036105a1575060059050806105d8565b826002036105b45750600f9050806105d8565b826003036105c85750601e905060056105d8565b826004036105d8575060059050601e5b6009546001600160a01b0316826105f0606434610f33565b6105fa9190610f55565b604051615e4a91906000818181858888f193505050503d806000811461063c576040519150601f19603f3d011682016040523d82523d6000602084013e610641565b606091505b5050600a546001600160a01b031690508161065d606434610f33565b6106679190610f55565b604051615e4a91906000818181858888f193505050503d80600081146106a9576040519150601f19603f3d011682016040523d82523d6000602084013e6106ae565b606091505b50506003546001600160a01b031690506106c9606434610f33565b604051615e4a91906000818181858888f193505050503d806000811461070b576040519150601f19603f3d011682016040523d82523d6000602084013e610710565b606091505b5050600b54604051630ab714fb60e11b815233600482015260248101879052604481018690526001600160a01b03909116915063156e29f6906064016020604051808303816000875af115801561076b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061078f9190610f72565b5050505050565b6000821180156107a857506103e88211155b6107e15760405162461bcd60e51b815260206004820152600a60248201526962616420647265616d7360b01b604482015260640161034a565b60008054905b8381101561081a5760646107fc836065610f55565b6108069190610f33565b91508061081281610f9b565b9150506107e7565b508034101561082857600080fd5b6064610835826065610f55565b61083f9190610f33565b60005561084d606434610f33565b61085890604e610f55565b600160008282546108699190610fb4565b9091555050811580159061087e575060048211155b6108b45760405162461bcd60e51b81526020600482015260076024820152666261647465616d60c81b604482015260640161034a565b600080836001036108ca57506005905080610901565b836002036108dd5750600f905080610901565b836003036108f15750601e90506005610901565b83600403610901575060059050601e5b6009546001600160a01b031682610919606434610f33565b6109239190610f55565b604051615e4a91906000818181858888f193505050503d8060008114610965576040519150601f19603f3d011682016040523d82523d6000602084013e61096a565b606091505b5050600a546001600160a01b0316905081610986606434610f33565b6109909190610f55565b604051615e4a91906000818181858888f193505050503d80600081146109d2576040519150601f19603f3d011682016040523d82523d6000602084013e6109d7565b606091505b50506003546001600160a01b031690506109f2606434610f33565b604051615e4a91906000818181858888f193505050503d8060008114610a34576040519150601f19603f3d011682016040523d82523d6000602084013e610a39565b606091505b50505060005b85811015610ac857600554604051630797d90960e51b81523360048201526001600160a01b039091169063f2fb2120906024016020604051808303816000875af1158015610a91573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ab59190610f04565b5080610ac081610f9b565b915050610a3f565b505050505050565b600081118015610ae1575060048111155b610b185760405162461bcd60e51b8152602060048201526008602482015267626164207465616d60c01b604482015260640161034a565b6007819055600554604051632770a7eb60e21b8152336004820152602481018490526001600160a01b0390911690639dc29fac90604401600060405180830381600087803b158015610b6957600080fd5b505af1158015610b7d573d6000803e3d6000fd5b505050504262015180610b909190610fb4565b6002555050600480546001600160a01b03191633179055565b600254421015610bee5760405162461bcd60e51b815260206004820152601060248201526f3737ba103a34b6b2903830b230bbb0b760811b604482015260640161034a565b6000806000600754600103610c0c5750603c9150600a905080610c54565b600754600203610c245750601e915081905080610c54565b600754600303610c3e575060149150603c9050600a610c54565b600754600403610c54575060149150600a9050603c5b6004546001600160a01b031683610c6c606447610f33565b610c769190610f55565b604051615e4a91906000818181858888f193505050503d8060008114610cb8576040519150601f19603f3d011682016040523d82523d6000602084013e610cbd565b606091505b50506009546001600160a01b0316905082610cd9606447610f33565b610ce39190610f55565b604051615e4a91906000818181858888f193505050503d8060008114610d25576040519150601f19603f3d011682016040523d82523d6000602084013e610d2a565b606091505b5050600a546001600160a01b0316905081610d46606447610f33565b610d509190610f55565b604051615e4a91906000818181858888f193505050503d8060008114610d92576040519150601f19603f3d011682016040523d82523d6000602084013e610d97565b606091505b5050600354600480546001600160a01b0319166001600160a01b0390921691909117905550610dc94262015180610fb4565b600255505050565b80356001600160a01b0381168114610de857600080fd5b919050565b60008060008060808587031215610e0357600080fd5b610e0c85610dd1565b9350610e1a60208601610dd1565b9250610e2860408601610dd1565b9150610e3660608601610dd1565b905092959194509250565b600060208284031215610e5357600080fd5b5035919050565b600060208083528351808285015260005b81811015610e8757858101830151858201604001528201610e6b565b506000604082860101526040601f19601f8301168501019250505092915050565b60008060408385031215610ebb57600080fd5b50508035926020909101359150565b600181811c90821680610ede57607f821691505b602082108103610efe57634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215610f1657600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b600082610f5057634e487b7160e01b600052601260045260246000fd5b500490565b8082028115828204841417610f6c57610f6c610f1d565b92915050565b600060208284031215610f8457600080fd5b81518015158114610f9457600080fd5b9392505050565b600060018201610fad57610fad610f1d565b5060010190565b80820180821115610f6c57610f6c610f1d56fea2646970667358221220d638bc2e9924432cbd557a8216b1c0ad961b8181de749a7a5598d7a903c01a5964736f6c63430008110033",
			"opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0xFE JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x88C9CB3C GT PUSH2 0x95 JUMPI DUP1 PUSH4 0xB390C0AB GT PUSH2 0x64 JUMPI DUP1 PUSH4 0xB390C0AB EQ PUSH2 0x27B JUMPI DUP1 PUSH4 0xB9425DAD EQ PUSH2 0x29B JUMPI DUP1 PUSH4 0xC7876EA4 EQ PUSH2 0x2BB JUMPI DUP1 PUSH4 0xD4114AFB EQ PUSH2 0x2D1 JUMPI DUP1 PUSH4 0xDFBF53AE EQ PUSH2 0x2E6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x88C9CB3C EQ PUSH2 0x21C JUMPI DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0x232 JUMPI DUP1 PUSH4 0x9D40A1AF EQ PUSH2 0x252 JUMPI DUP1 PUSH4 0xA035B1FE EQ PUSH2 0x265 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x4BA2363A GT PUSH2 0xD1 JUMPI DUP1 PUSH4 0x4BA2363A EQ PUSH2 0x1AF JUMPI DUP1 PUSH4 0x5B1687B0 EQ PUSH2 0x1D3 JUMPI DUP1 PUSH4 0x5D7CEB12 EQ PUSH2 0x1E6 JUMPI DUP1 PUSH4 0x71722F0A EQ PUSH2 0x206 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x35633B19 EQ PUSH2 0x103 JUMPI DUP1 PUSH4 0x3697615F EQ PUSH2 0x125 JUMPI DUP1 PUSH4 0x3943380C EQ PUSH2 0x162 JUMPI DUP1 PUSH4 0x3ED2B77A EQ PUSH2 0x182 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x10F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x11E CALLDATASIZE PUSH1 0x4 PUSH2 0xDED JUMP JUMPDEST PUSH2 0x306 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x131 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x9 SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND DUP2 MSTORE PUSH1 0x20 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x16E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x5 SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x18E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1A2 PUSH2 0x19D CALLDATASIZE PUSH1 0x4 PUSH2 0xE41 JUMP JUMPDEST PUSH2 0x393 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x159 SWAP2 SWAP1 PUSH2 0xE5A JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1BB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1C5 PUSH1 0x1 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0x159 JUMP JUMPDEST PUSH2 0x123 PUSH2 0x1E1 CALLDATASIZE PUSH1 0x4 PUSH2 0xEA8 JUMP JUMPDEST PUSH2 0x43F JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1F2 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0xA SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x212 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1C5 PUSH1 0x7 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x228 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1C5 PUSH1 0x2 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x23E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x3 SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST PUSH2 0x123 PUSH2 0x260 CALLDATASIZE PUSH1 0x4 PUSH2 0xEA8 JUMP JUMPDEST PUSH2 0x796 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x271 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1C5 PUSH1 0x0 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x287 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x296 CALLDATASIZE PUSH1 0x4 PUSH2 0xEA8 JUMP JUMPDEST PUSH2 0xAD0 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2A7 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0xB SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2C7 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1C5 PUSH1 0x6 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2DD JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0xBA9 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2F2 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST PUSH20 0x791F1CFB231E7C75EEE4B7F8913E3C2B3548EB93 CALLER EQ PUSH2 0x353 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x2 PUSH1 0x24 DUP3 ADD MSTORE PUSH2 0x6E6F PUSH1 0xF0 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x9 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP5 DUP6 AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT SWAP2 DUP3 AND OR SWAP1 SWAP2 SSTORE PUSH1 0xA DUP1 SLOAD SWAP4 DUP6 AND SWAP4 DUP3 AND SWAP4 SWAP1 SWAP4 OR SWAP1 SWAP3 SSTORE PUSH1 0xB DUP1 SLOAD SWAP2 SWAP1 SWAP4 AND SWAP2 AND OR SWAP1 SSTORE POP JUMP JUMPDEST PUSH1 0x8 DUP2 DUP2 SLOAD DUP2 LT PUSH2 0x3A3 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 ADD PUSH1 0x0 SWAP2 POP SWAP1 POP DUP1 SLOAD PUSH2 0x3BE SWAP1 PUSH2 0xECA JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x3EA SWAP1 PUSH2 0xECA JUMP JUMPDEST DUP1 ISZERO PUSH2 0x437 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x40C JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x437 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x41A JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP DUP2 JUMP JUMPDEST PUSH1 0x0 DUP3 GT DUP1 ISZERO PUSH2 0x45B JUMPI POP PUSH13 0x7E37BE2022C0914B2680000000 DUP3 LT JUMPDEST PUSH2 0x494 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0xA PUSH1 0x24 DUP3 ADD MSTORE PUSH10 0x62616420647265616D73 PUSH1 0xB0 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x34A JUMP JUMPDEST PUSH1 0xB SLOAD PUSH1 0x40 MLOAD PUSH4 0xAE104265 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 DUP2 ADD DUP5 SWAP1 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND SWAP1 PUSH4 0xAE104265 SWAP1 PUSH1 0x24 ADD PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x4DD JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x501 SWAP2 SWAP1 PUSH2 0xF04 JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 SSTORE CALLVALUE LT ISZERO PUSH2 0x544 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0xC PUSH1 0x24 DUP3 ADD MSTORE PUSH12 0x18D85B89DD081859999BDC99 PUSH1 0xA2 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x34A JUMP JUMPDEST PUSH1 0x0 DUP2 GT DUP1 ISZERO PUSH2 0x555 JUMPI POP PUSH1 0x4 DUP2 GT ISZERO JUMPDEST PUSH2 0x58B JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x7 PUSH1 0x24 DUP3 ADD MSTORE PUSH7 0x6261647465616D PUSH1 0xC8 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x34A JUMP JUMPDEST PUSH1 0x0 DUP1 DUP3 PUSH1 0x1 SUB PUSH2 0x5A1 JUMPI POP PUSH1 0x5 SWAP1 POP DUP1 PUSH2 0x5D8 JUMP JUMPDEST DUP3 PUSH1 0x2 SUB PUSH2 0x5B4 JUMPI POP PUSH1 0xF SWAP1 POP DUP1 PUSH2 0x5D8 JUMP JUMPDEST DUP3 PUSH1 0x3 SUB PUSH2 0x5C8 JUMPI POP PUSH1 0x1E SWAP1 POP PUSH1 0x5 PUSH2 0x5D8 JUMP JUMPDEST DUP3 PUSH1 0x4 SUB PUSH2 0x5D8 JUMPI POP PUSH1 0x5 SWAP1 POP PUSH1 0x1E JUMPDEST PUSH1 0x9 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP3 PUSH2 0x5F0 PUSH1 0x64 CALLVALUE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0x5FA SWAP2 SWAP1 PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x63C JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x641 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0xA SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 POP DUP2 PUSH2 0x65D PUSH1 0x64 CALLVALUE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0x667 SWAP2 SWAP1 PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x6A9 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x6AE JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0x3 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 POP PUSH2 0x6C9 PUSH1 0x64 CALLVALUE PUSH2 0xF33 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x70B JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x710 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0xB SLOAD PUSH1 0x40 MLOAD PUSH4 0xAB714FB PUSH1 0xE1 SHL DUP2 MSTORE CALLER PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 DUP2 ADD DUP8 SWAP1 MSTORE PUSH1 0x44 DUP2 ADD DUP7 SWAP1 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND SWAP2 POP PUSH4 0x156E29F6 SWAP1 PUSH1 0x64 ADD PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 GAS CALL ISZERO DUP1 ISZERO PUSH2 0x76B JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x78F SWAP2 SWAP1 PUSH2 0xF72 JUMP JUMPDEST POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 GT DUP1 ISZERO PUSH2 0x7A8 JUMPI POP PUSH2 0x3E8 DUP3 GT ISZERO JUMPDEST PUSH2 0x7E1 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0xA PUSH1 0x24 DUP3 ADD MSTORE PUSH10 0x62616420647265616D73 PUSH1 0xB0 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x34A JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD SWAP1 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x81A JUMPI PUSH1 0x64 PUSH2 0x7FC DUP4 PUSH1 0x65 PUSH2 0xF55 JUMP JUMPDEST PUSH2 0x806 SWAP2 SWAP1 PUSH2 0xF33 JUMP JUMPDEST SWAP2 POP DUP1 PUSH2 0x812 DUP2 PUSH2 0xF9B JUMP JUMPDEST SWAP2 POP POP PUSH2 0x7E7 JUMP JUMPDEST POP DUP1 CALLVALUE LT ISZERO PUSH2 0x828 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x64 PUSH2 0x835 DUP3 PUSH1 0x65 PUSH2 0xF55 JUMP JUMPDEST PUSH2 0x83F SWAP2 SWAP1 PUSH2 0xF33 JUMP JUMPDEST PUSH1 0x0 SSTORE PUSH2 0x84D PUSH1 0x64 CALLVALUE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0x858 SWAP1 PUSH1 0x4E PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x869 SWAP2 SWAP1 PUSH2 0xFB4 JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP DUP2 ISZERO DUP1 ISZERO SWAP1 PUSH2 0x87E JUMPI POP PUSH1 0x4 DUP3 GT ISZERO JUMPDEST PUSH2 0x8B4 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x7 PUSH1 0x24 DUP3 ADD MSTORE PUSH7 0x6261647465616D PUSH1 0xC8 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x34A JUMP JUMPDEST PUSH1 0x0 DUP1 DUP4 PUSH1 0x1 SUB PUSH2 0x8CA JUMPI POP PUSH1 0x5 SWAP1 POP DUP1 PUSH2 0x901 JUMP JUMPDEST DUP4 PUSH1 0x2 SUB PUSH2 0x8DD JUMPI POP PUSH1 0xF SWAP1 POP DUP1 PUSH2 0x901 JUMP JUMPDEST DUP4 PUSH1 0x3 SUB PUSH2 0x8F1 JUMPI POP PUSH1 0x1E SWAP1 POP PUSH1 0x5 PUSH2 0x901 JUMP JUMPDEST DUP4 PUSH1 0x4 SUB PUSH2 0x901 JUMPI POP PUSH1 0x5 SWAP1 POP PUSH1 0x1E JUMPDEST PUSH1 0x9 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP3 PUSH2 0x919 PUSH1 0x64 CALLVALUE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0x923 SWAP2 SWAP1 PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x965 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x96A JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0xA SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 POP DUP2 PUSH2 0x986 PUSH1 0x64 CALLVALUE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0x990 SWAP2 SWAP1 PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x9D2 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x9D7 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0x3 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 POP PUSH2 0x9F2 PUSH1 0x64 CALLVALUE PUSH2 0xF33 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0xA34 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0xA39 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP POP PUSH1 0x0 JUMPDEST DUP6 DUP2 LT ISZERO PUSH2 0xAC8 JUMPI PUSH1 0x5 SLOAD PUSH1 0x40 MLOAD PUSH4 0x797D909 PUSH1 0xE5 SHL DUP2 MSTORE CALLER PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND SWAP1 PUSH4 0xF2FB2120 SWAP1 PUSH1 0x24 ADD PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 GAS CALL ISZERO DUP1 ISZERO PUSH2 0xA91 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0xAB5 SWAP2 SWAP1 PUSH2 0xF04 JUMP JUMPDEST POP DUP1 PUSH2 0xAC0 DUP2 PUSH2 0xF9B JUMP JUMPDEST SWAP2 POP POP PUSH2 0xA3F JUMP JUMPDEST POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 GT DUP1 ISZERO PUSH2 0xAE1 JUMPI POP PUSH1 0x4 DUP2 GT ISZERO JUMPDEST PUSH2 0xB18 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x8 PUSH1 0x24 DUP3 ADD MSTORE PUSH8 0x626164207465616D PUSH1 0xC0 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x34A JUMP JUMPDEST PUSH1 0x7 DUP2 SWAP1 SSTORE PUSH1 0x5 SLOAD PUSH1 0x40 MLOAD PUSH4 0x2770A7EB PUSH1 0xE2 SHL DUP2 MSTORE CALLER PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 DUP2 ADD DUP5 SWAP1 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND SWAP1 PUSH4 0x9DC29FAC SWAP1 PUSH1 0x44 ADD PUSH1 0x0 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0xB69 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS CALL ISZERO DUP1 ISZERO PUSH2 0xB7D JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP TIMESTAMP PUSH3 0x15180 PUSH2 0xB90 SWAP2 SWAP1 PUSH2 0xFB4 JUMP JUMPDEST PUSH1 0x2 SSTORE POP POP PUSH1 0x4 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND CALLER OR SWAP1 SSTORE JUMP JUMPDEST PUSH1 0x2 SLOAD TIMESTAMP LT ISZERO PUSH2 0xBEE JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x10 PUSH1 0x24 DUP3 ADD MSTORE PUSH16 0x3737BA103A34B6B2903830B230BBB0B7 PUSH1 0x81 SHL PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x34A JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0x7 SLOAD PUSH1 0x1 SUB PUSH2 0xC0C JUMPI POP PUSH1 0x3C SWAP2 POP PUSH1 0xA SWAP1 POP DUP1 PUSH2 0xC54 JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH1 0x2 SUB PUSH2 0xC24 JUMPI POP PUSH1 0x1E SWAP2 POP DUP2 SWAP1 POP DUP1 PUSH2 0xC54 JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH1 0x3 SUB PUSH2 0xC3E JUMPI POP PUSH1 0x14 SWAP2 POP PUSH1 0x3C SWAP1 POP PUSH1 0xA PUSH2 0xC54 JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH1 0x4 SUB PUSH2 0xC54 JUMPI POP PUSH1 0x14 SWAP2 POP PUSH1 0xA SWAP1 POP PUSH1 0x3C JUMPDEST PUSH1 0x4 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP4 PUSH2 0xC6C PUSH1 0x64 SELFBALANCE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0xC76 SWAP2 SWAP1 PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0xCB8 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0xCBD JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0x9 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 POP DUP3 PUSH2 0xCD9 PUSH1 0x64 SELFBALANCE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0xCE3 SWAP2 SWAP1 PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0xD25 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0xD2A JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0xA SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 POP DUP2 PUSH2 0xD46 PUSH1 0x64 SELFBALANCE PUSH2 0xF33 JUMP JUMPDEST PUSH2 0xD50 SWAP2 SWAP1 PUSH2 0xF55 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x5E4A SWAP2 SWAP1 PUSH1 0x0 DUP2 DUP2 DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0xD92 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0xD97 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP PUSH1 0x3 SLOAD PUSH1 0x4 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP3 AND SWAP2 SWAP1 SWAP2 OR SWAP1 SSTORE POP PUSH2 0xDC9 TIMESTAMP PUSH3 0x15180 PUSH2 0xFB4 JUMP JUMPDEST PUSH1 0x2 SSTORE POP POP POP JUMP JUMPDEST DUP1 CALLDATALOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 EQ PUSH2 0xDE8 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP1 PUSH1 0x80 DUP6 DUP8 SUB SLT ISZERO PUSH2 0xE03 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xE0C DUP6 PUSH2 0xDD1 JUMP JUMPDEST SWAP4 POP PUSH2 0xE1A PUSH1 0x20 DUP7 ADD PUSH2 0xDD1 JUMP JUMPDEST SWAP3 POP PUSH2 0xE28 PUSH1 0x40 DUP7 ADD PUSH2 0xDD1 JUMP JUMPDEST SWAP2 POP PUSH2 0xE36 PUSH1 0x60 DUP7 ADD PUSH2 0xDD1 JUMP JUMPDEST SWAP1 POP SWAP3 SWAP6 SWAP2 SWAP5 POP SWAP3 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xE53 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP1 DUP4 MSTORE DUP4 MLOAD DUP1 DUP3 DUP6 ADD MSTORE PUSH1 0x0 JUMPDEST DUP2 DUP2 LT ISZERO PUSH2 0xE87 JUMPI DUP6 DUP2 ADD DUP4 ADD MLOAD DUP6 DUP3 ADD PUSH1 0x40 ADD MSTORE DUP3 ADD PUSH2 0xE6B JUMP JUMPDEST POP PUSH1 0x0 PUSH1 0x40 DUP3 DUP7 ADD ADD MSTORE PUSH1 0x40 PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND DUP6 ADD ADD SWAP3 POP POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0xEBB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP POP DUP1 CALLDATALOAD SWAP3 PUSH1 0x20 SWAP1 SWAP2 ADD CALLDATALOAD SWAP2 POP JUMP JUMPDEST PUSH1 0x1 DUP2 DUP2 SHR SWAP1 DUP3 AND DUP1 PUSH2 0xEDE JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 SUB PUSH2 0xEFE JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xF16 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD SWAP2 SWAP1 POP JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP3 PUSH2 0xF50 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x12 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP DIV SWAP1 JUMP JUMPDEST DUP1 DUP3 MUL DUP2 ISZERO DUP3 DUP3 DIV DUP5 EQ OR PUSH2 0xF6C JUMPI PUSH2 0xF6C PUSH2 0xF1D JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xF84 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 MLOAD DUP1 ISZERO ISZERO DUP2 EQ PUSH2 0xF94 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 DUP3 ADD PUSH2 0xFAD JUMPI PUSH2 0xFAD PUSH2 0xF1D JUMP JUMPDEST POP PUSH1 0x1 ADD SWAP1 JUMP JUMPDEST DUP1 DUP3 ADD DUP1 DUP3 GT ISZERO PUSH2 0xF6C JUMPI PUSH2 0xF6C PUSH2 0xF1D JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xD6 CODESIZE 0xBC 0x2E SWAP10 0x24 NUMBER 0x2C 0xBD SSTORE PUSH27 0x8216B1C0AD961B8181DE749A7A5598D7A903C01A5964736F6C6343 STOP ADDMOD GT STOP CALLER ",
			"sourceMap": "528:5730:18:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1895:325;;;;;;;;;;-1:-1:-1;1895:325:18;;;;;:::i;:::-;;:::i;:::-;;1392:23;;;;;;;;;;-1:-1:-1;1392:23:18;;;;-1:-1:-1;;;;;1392:23:18;;;;;;-1:-1:-1;;;;;796:32:19;;;778:51;;766:2;751:18;1392:23:18;;;;;;;;1231:19;;;;;;;;;;-1:-1:-1;1231:19:18;;;;-1:-1:-1;;;;;1231:19:18;;;1325:57;;;;;;;;;;-1:-1:-1;1325:57:18;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;664:18::-;;;;;;;;;;;;;;;;;;;1949:25:19;;;1937:2;1922:18;664::18;1803:177:19;3952:1175:18;;;;;;:::i;:::-;;:::i;1425:23::-;;;;;;;;;;-1:-1:-1;1425:23:18;;;;-1:-1:-1;;;;;1425:23:18;;;1295:20;;;;;;;;;;;;;;;;769;;;;;;;;;;;;;;;;987:28;;;;;;;;;;-1:-1:-1;987:28:18;;;;-1:-1:-1;;;;;987:28:18;;;2531:1397;;;;;;:::i;:::-;;:::i;552:20::-;;;;;;;;;;;;;;;;2227:274;;;;;;;;;;-1:-1:-1;2227:274:18;;;;;:::i;:::-;;:::i;1458:14::-;;;;;;;;;;-1:-1:-1;1458:14:18;;;;-1:-1:-1;;;;;1458:14:18;;;1260:25;;;;;;;;;;;;;;;;5159:1095;;;;;;;;;;;;;:::i;1094:21::-;;;;;;;;;;-1:-1:-1;1094:21:18;;;;-1:-1:-1;;;;;1094:21:18;;;1895:325;2019:42;2005:10;:56;1997:71;;;;-1:-1:-1;;;1997:71:18;;3323:2:19;1997:71:18;;;3305:21:19;3362:1;3342:18;;;3335:29;-1:-1:-1;;;3380:18:19;;;3373:32;3422:18;;1997:71:18;;;;;;;;;2081:6;:39;;-1:-1:-1;;;;;2081:39:18;;;-1:-1:-1;;;;;;2081:39:18;;;;;;;2132:9;:43;;;;;;;;;;;;;;;2187:3;:24;;;;;;;;;;;-1:-1:-1;1895:325:18:o;1325:57::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;3952:1175::-;4068:1;4048:17;:21;:81;;;;;4093:36;4073:17;:56;4048:81;4040:104;;;;-1:-1:-1;;;4040:104:18;;4038:2:19;4040:104:18;;;4020:21:19;4077:2;4057:18;;;4050:30;-1:-1:-1;;;4096:18:19;;;4089:40;4146:18;;4040:104:18;3836:334:19;4040:104:18;4174:3;;:37;;-1:-1:-1;;;4174:37:18;;;;;1949:25:19;;;-1:-1:-1;;;;;4174:3:18;;;;:18;;1922::19;;4174:37:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;4166:5;:45;;;4231:9;:18;;4223:43;;;;-1:-1:-1;;;4223:43:18;;4566:2:19;4223:43:18;;;4548:21:19;4605:2;4585:18;;;4578:30;-1:-1:-1;;;4624:18:19;;;4617:42;4676:18;;4223:43:18;4364:336:19;4223:43:18;4292:1;4285:4;:8;:21;;;;;4305:1;4297:4;:9;;4285:21;4277:41;;;;-1:-1:-1;;;4277:41:18;;4907:2:19;4277:41:18;;;4889:21:19;4946:1;4926:18;;;4919:29;-1:-1:-1;;;4964:18:19;;;4957:37;5011:18;;4277:41:18;4705:330:19;4277:41:18;4328:11;4349:10;4375:4;4383:1;4375:9;4371:367;;-1:-1:-1;4410:1:18;;-1:-1:-1;4410:1:18;4371:367;;;4470:4;4478:1;4470:9;4466:272;;-1:-1:-1;4505:2:18;;-1:-1:-1;4505:2:18;4466:272;;;4567:4;4575:1;4567:9;4563:175;;-1:-1:-1;4602:2:18;;-1:-1:-1;4628:1:18;4563:175;;;4663:4;4671:1;4663:9;4659:79;;-1:-1:-1;4698:1:18;;-1:-1:-1;4723:2:18;4659:79;4828:6;;-1:-1:-1;;;;;4828:6:18;4867;4848:16;4861:3;4848:9;:16;:::i;:::-;:25;;;;:::i;:::-;4812:78;;4880:5;;4812:78;;;;;;;4880:5;4812:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;4918:9:18;;-1:-1:-1;;;;;4918:9:18;;-1:-1:-1;4960:5:18;4941:16;4954:3;4941:9;:16;:::i;:::-;:24;;;;:::i;:::-;4902:80;;4972:5;;4902:80;;;;;;;4972:5;4902:80;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;5010:5:18;;-1:-1:-1;;;;;5010:5:18;;-1:-1:-1;5029:15:18;5041:3;5029:9;:15;:::i;:::-;4994:68;;5052:5;;4994:68;;;;;;;5052:5;4994:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;5072:3:18;;:45;;-1:-1:-1;;;5072:45:18;;5081:10;5072:45;;;5979:51:19;6046:18;;;6039:34;;;6089:18;;;6082:34;;;-1:-1:-1;;;;;5072:3:18;;;;-1:-1:-1;5072:8:18;;5952:18:19;;5072:45:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;4028:1099;;3952:1175;;:::o;2531:1397::-;2646:1;2626:17;:21;:50;;;;;2672:4;2651:17;:25;;2626:50;2618:73;;;;-1:-1:-1;;;2618:73:18;;4038:2:19;2618:73:18;;;4020:21:19;4077:2;4057:18;;;4050:30;-1:-1:-1;;;4096:18:19;;;4089:40;4146:18;;2618:73:18;3836:334:19;2618:73:18;2703:14;2720:5;;;2737:103;2761:17;2757:1;:21;2737:103;;;2824:3;2809:12;:6;2818:3;2809:12;:::i;:::-;:18;;;;:::i;:::-;2800:27;-1:-1:-1;2780:3:18;;;;:::i;:::-;;;;2737:103;;;;2872:6;2859:9;:19;;2851:28;;;;;;2914:3;2899:12;:6;2908:3;2899:12;:::i;:::-;:18;;;;:::i;:::-;2891:5;:26;2936:15;2948:3;2936:9;:15;:::i;:::-;:20;;2954:2;2936:20;:::i;:::-;2929:3;;:27;;;;;;;:::i;:::-;;;;-1:-1:-1;;2975:8:18;;;;;:21;;;2995:1;2987:4;:9;;2975:21;2967:41;;;;-1:-1:-1;;;2967:41:18;;4907:2:19;2967:41:18;;;4889:21:19;4946:1;4926:18;;;4919:29;-1:-1:-1;;;4964:18:19;;;4957:37;5011:18;;2967:41:18;4705:330:19;2967:41:18;3018:11;3039:10;3065:4;3073:1;3065:9;3061:367;;-1:-1:-1;3100:1:18;;-1:-1:-1;3100:1:18;3061:367;;;3160:4;3168:1;3160:9;3156:272;;-1:-1:-1;3195:2:18;;-1:-1:-1;3195:2:18;3156:272;;;3257:4;3265:1;3257:9;3253:175;;-1:-1:-1;3292:2:18;;-1:-1:-1;3318:1:18;3253:175;;;3353:4;3361:1;3353:9;3349:79;;-1:-1:-1;3388:1:18;;-1:-1:-1;3413:2:18;3349:79;3518:6;;-1:-1:-1;;;;;3518:6:18;3557;3538:16;3551:3;3538:9;:16;:::i;:::-;:25;;;;:::i;:::-;3502:78;;3570:5;;3502:78;;;;;;;3570:5;3502:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;3608:9:18;;-1:-1:-1;;;;;3608:9:18;;-1:-1:-1;3650:5:18;3631:16;3644:3;3631:9;:16;:::i;:::-;:24;;;;:::i;:::-;3592:80;;3662:5;;3592:80;;;;;;;3662:5;3592:80;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;3700:5:18;;-1:-1:-1;;;;;3700:5:18;;-1:-1:-1;3719:15:18;3731:3;3719:9;:15;:::i;:::-;3684:68;;3742:5;;3684:68;;;;;;;3742:5;3684:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3767:9;3762:115;3786:17;3782:1;:21;3762:115;;;3832:3;;:34;;-1:-1:-1;;;3832:34:18;;3854:10;3832:34;;;778:51:19;-1:-1:-1;;;;;3832:3:18;;;;:13;;751:18:19;;3832:34:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;-1:-1:-1;3805:3:18;;;;:::i;:::-;;;;3762:115;;;;2606:1322;;;2531:1397;;:::o;2227:274::-;2312:1;2305:4;:8;:21;;;;;2325:1;2317:4;:9;;2305:21;2296:43;;;;-1:-1:-1;;;2296:43:18;;6881:2:19;2296:43:18;;;6863:21:19;6920:1;6900:18;;;6893:29;-1:-1:-1;;;6938:18:19;;;6931:38;6986:18;;2296:43:18;6679:331:19;2296:43:18;2351:8;:15;;;2390:3;;:29;;-1:-1:-1;;;2390:29:18;;2399:10;2390:29;;;7189:51:19;7256:18;;;7249:34;;;-1:-1:-1;;;;;2390:3:18;;;;:8;;7162:18:19;;2390:29:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2439:15;2457:8;2439:26;;;;:::i;:::-;2431:5;:34;-1:-1:-1;;2475:6:18;:19;;-1:-1:-1;;;;;;2475:19:18;2484:10;2475:19;;;2227:274::o;5159:1095::-;5230:5;;5211:15;:24;;5203:53;;;;-1:-1:-1;;;5203:53:18;;7496:2:19;5203:53:18;;;7478:21:19;7535:2;7515:18;;;7508:30;-1:-1:-1;;;7554:18:19;;;7547:46;7610:18;;5203:53:18;7294:340:19;5203:53:18;5269:10;5291:11;5314:10;5340:8;;5352:1;5340:13;5336:489;;-1:-1:-1;5378:2:18;;-1:-1:-1;5405:2:18;;-1:-1:-1;5405:2:18;5336:489;;;5467:8;;5479:1;5467:13;5463:362;;-1:-1:-1;5503:2:18;;-1:-1:-1;5503:2:18;;-1:-1:-1;5503:2:18;5463:362;;;5592:8;;5604:1;5592:13;5588:237;;-1:-1:-1;5630:2:18;;-1:-1:-1;5657:2:18;;-1:-1:-1;5683:2:18;5588:237;;;5719:8;;5731:1;5719:13;5715:110;;-1:-1:-1;5757:2:18;;-1:-1:-1;5784:2:18;;-1:-1:-1;5810:2:18;5715:110;5844:6;;-1:-1:-1;;;;;5844:6:18;5893:5;5863:27;5887:3;5863:21;:27;:::i;:::-;:35;;;;:::i;:::-;5836:80;;5906:5;;5836:80;;;;;;;5906:5;5836:80;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;5952:6:18;;-1:-1:-1;;;;;5952:6:18;;-1:-1:-1;6002:6:18;5972:27;5996:3;5972:21;:27;:::i;:::-;:36;;;;:::i;:::-;5936:89;;6015:5;;5936:89;;;;;;;6015:5;5936:89;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;6053:9:18;;-1:-1:-1;;;;;6053:9:18;;-1:-1:-1;6106:5:18;6076:27;6100:3;6076:21;:27;:::i;:::-;:35;;;;:::i;:::-;6037:91;;6118:5;;6037:91;;;;;;;6118:5;6037:91;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;6149:5:18;;6140:6;:14;;-1:-1:-1;;;;;;6140:14:18;-1:-1:-1;;;;;6149:5:18;;;6140:14;;;;;;-1:-1:-1;6172:26:18;:15;6190:8;6172:26;:::i;:::-;6164:5;:34;-1:-1:-1;;;5159:1095:18:o;14:173:19:-;82:20;;-1:-1:-1;;;;;131:31:19;;121:42;;111:70;;177:1;174;167:12;111:70;14:173;;;:::o;192:409::-;278:6;286;294;302;355:3;343:9;334:7;330:23;326:33;323:53;;;372:1;369;362:12;323:53;395:29;414:9;395:29;:::i;:::-;385:39;;443:38;477:2;466:9;462:18;443:38;:::i;:::-;433:48;;500:38;534:2;523:9;519:18;500:38;:::i;:::-;490:48;;557:38;591:2;580:9;576:18;557:38;:::i;:::-;547:48;;192:409;;;;;;;:::o;1065:180::-;1124:6;1177:2;1165:9;1156:7;1152:23;1148:32;1145:52;;;1193:1;1190;1183:12;1145:52;-1:-1:-1;1216:23:19;;1065:180;-1:-1:-1;1065:180:19:o;1250:548::-;1362:4;1391:2;1420;1409:9;1402:21;1452:6;1446:13;1495:6;1490:2;1479:9;1475:18;1468:34;1520:1;1530:140;1544:6;1541:1;1538:13;1530:140;;;1639:14;;;1635:23;;1629:30;1605:17;;;1624:2;1601:26;1594:66;1559:10;;1530:140;;;1534:3;1719:1;1714:2;1705:6;1694:9;1690:22;1686:31;1679:42;1789:2;1782;1778:7;1773:2;1765:6;1761:15;1757:29;1746:9;1742:45;1738:54;1730:62;;;;1250:548;;;;:::o;1985:248::-;2053:6;2061;2114:2;2102:9;2093:7;2089:23;2085:32;2082:52;;;2130:1;2127;2120:12;2082:52;-1:-1:-1;;2153:23:19;;;2223:2;2208:18;;;2195:32;;-1:-1:-1;1985:248:19:o;3451:380::-;3530:1;3526:12;;;;3573;;;3594:61;;3648:4;3640:6;3636:17;3626:27;;3594:61;3701:2;3693:6;3690:14;3670:18;3667:38;3664:161;;3747:10;3742:3;3738:20;3735:1;3728:31;3782:4;3779:1;3772:15;3810:4;3807:1;3800:15;3664:161;;3451:380;;;:::o;4175:184::-;4245:6;4298:2;4286:9;4277:7;4273:23;4269:32;4266:52;;;4314:1;4311;4304:12;4266:52;-1:-1:-1;4337:16:19;;4175:184;-1:-1:-1;4175:184:19:o;5040:127::-;5101:10;5096:3;5092:20;5089:1;5082:31;5132:4;5129:1;5122:15;5156:4;5153:1;5146:15;5172:217;5212:1;5238;5228:132;;5282:10;5277:3;5273:20;5270:1;5263:31;5317:4;5314:1;5307:15;5345:4;5342:1;5335:15;5228:132;-1:-1:-1;5374:9:19;;5172:217::o;5394:168::-;5467:9;;;5498;;5515:15;;;5509:22;;5495:37;5485:71;;5536:18;;:::i;:::-;5394:168;;;;:::o;6127:277::-;6194:6;6247:2;6235:9;6226:7;6222:23;6218:32;6215:52;;;6263:1;6260;6253:12;6215:52;6295:9;6289:16;6348:5;6341:13;6334:21;6327:5;6324:32;6314:60;;6370:1;6367;6360:12;6314:60;6393:5;6127:277;-1:-1:-1;;;6127:277:19:o;6409:135::-;6448:3;6469:17;;;6466:43;;6489:18;;:::i;:::-;-1:-1:-1;6536:1:19;6525:13;;6409:135::o;6549:125::-;6614:9;;;6635:10;;;6632:36;;;6648:18;;:::i"
		},
		"gasEstimates": {
			"creation": {
				"codeDepositCost": "818600",
				"executionCost": "infinite",
				"totalCost": "infinite"
			},
			"external": {
				"basePrice()": "2361",
				"burn(uint256,uint256)": "infinite",
				"concludeRound()": "infinite",
				"fanout()": "2372",
				"ifIwasinla(uint256,uint256)": "infinite",
				"ifIwasinla2(uint256,uint256)": "infinite",
				"j3d()": "2370",
				"key()": "2394",
				"lastTeam()": "2384",
				"owner()": "2371",
				"pot()": "2318",
				"price()": "2384",
				"setStuff(address,address,address,address)": "infinite",
				"teams(uint256)": "infinite",
				"timer()": "2318",
				"tokFanout()": "2393",
				"winner()": "2436"
			}
		},
		"methodIdentifiers": {
			"basePrice()": "c7876ea4",
			"burn(uint256,uint256)": "b390c0ab",
			"concludeRound()": "d4114afb",
			"fanout()": "3697615f",
			"ifIwasinla(uint256,uint256)": "9d40a1af",
			"ifIwasinla2(uint256,uint256)": "5b1687b0",
			"j3d()": "b9425dad",
			"key()": "3943380c",
			"lastTeam()": "71722f0a",
			"owner()": "8da5cb5b",
			"pot()": "4ba2363a",
			"price()": "a035b1fe",
			"setStuff(address,address,address,address)": "35633b19",
			"teams(uint256)": "3ed2b77a",
			"timer()": "88c9cb3c",
			"tokFanout()": "5d7ceb12",
			"winner()": "dfbf53ae"
		}
	},
	"abi": [
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_price",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_theKeys",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_theFanout",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_theTokFanout",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "string",
					"name": "msg",
					"type": "string"
				}
			],
			"name": "Logit",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "basePrice",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "team",
					"type": "uint256"
				}
			],
			"name": "burn",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "concludeRound",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "fanout",
			"outputs": [
				{
					"internalType": "contract NFTFanout",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "californiadreamin",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "team",
					"type": "uint256"
				}
			],
			"name": "ifIwasinla",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "californiadreamin",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "team",
					"type": "uint256"
				}
			],
			"name": "ifIwasinla2",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "j3d",
			"outputs": [
				{
					"internalType": "contract J3d",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "key",
			"outputs": [
				{
					"internalType": "contract GameItem",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "lastTeam",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address payable",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "pot",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "price",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_theKeys",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_theFanout",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_theTokFanout",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_tok",
					"type": "address"
				}
			],
			"name": "setStuff",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "teams",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "timer",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "tokFanout",
			"outputs": [
				{
					"internalType": "contract Fanout",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "winner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
}
const abi =[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "team",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "concludeRound",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "californiadreamin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "team",
				"type": "uint256"
			}
		],
		"name": "ifIwasinla",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_theKeys",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_theFanout",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_theTokFanout",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "msg",
				"type": "string"
			}
		],
		"name": "Logit",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "basePrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "fanout",
		"outputs": [
			{
				"internalType": "contract NFTFanout",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "j3d",
		"outputs": [
			{
				"internalType": "contract J3d",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "key",
		"outputs": [
			{
				"internalType": "contract GameItem",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastTeam",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pot",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "teams",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "timer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokFanout",
		"outputs": [
			{
				"internalType": "contract Fanout",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const j3dAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_game",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ticker",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_fanout",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_tokFanout",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "basePrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "calculatePrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "growthRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "team",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uni",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const fanoutAbi= {
	"deploy": {
		"VM:-": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"main:1": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"ropsten:3": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"rinkeby:4": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"kovan:42": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"goerli:5": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"Custom": {
			"linkReferences": {},
			"autoDeployLib": true
		}
	},
	"data": {
		"bytecode": {
			"functionDebugData": {
				"@_23": {
					"entryPoint": null,
					"id": 23,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@_4088": {
					"entryPoint": null,
					"id": 4088,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"@_msgSender_2419": {
					"entryPoint": 159,
					"id": 2419,
					"parameterSlots": 0,
					"returnSlots": 1
				},
				"@_transferOwnership_111": {
					"entryPoint": 167,
					"id": 111,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"abi_decode_t_address_fromMemory": {
					"entryPoint": 446,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_tuple_t_address_fromMemory": {
					"entryPoint": 469,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"allocate_unbounded": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 1
				},
				"cleanup_t_address": {
					"entryPoint": 400,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"cleanup_t_uint160": {
					"entryPoint": 368,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b": {
					"entryPoint": 363,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"validator_revert_t_address": {
					"entryPoint": 420,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				}
			},
			"generatedSources": [
				{
					"ast": {
						"nodeType": "YulBlock",
						"src": "0:1199:22",
						"statements": [
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "47:35:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "57:19:22",
											"value": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "73:2:22",
														"type": "",
														"value": "64"
													}
												],
												"functionName": {
													"name": "mload",
													"nodeType": "YulIdentifier",
													"src": "67:5:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "67:9:22"
											},
											"variableNames": [
												{
													"name": "memPtr",
													"nodeType": "YulIdentifier",
													"src": "57:6:22"
												}
											]
										}
									]
								},
								"name": "allocate_unbounded",
								"nodeType": "YulFunctionDefinition",
								"returnVariables": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "40:6:22",
										"type": ""
									}
								],
								"src": "7:75:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "177:28:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "194:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "197:1:22",
														"type": "",
														"value": "0"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "187:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "187:12:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "187:12:22"
										}
									]
								},
								"name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
								"nodeType": "YulFunctionDefinition",
								"src": "88:117:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "300:28:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "317:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "320:1:22",
														"type": "",
														"value": "0"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "310:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "310:12:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "310:12:22"
										}
									]
								},
								"name": "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db",
								"nodeType": "YulFunctionDefinition",
								"src": "211:117:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "379:81:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "389:65:22",
											"value": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "404:5:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "411:42:22",
														"type": "",
														"value": "0xffffffffffffffffffffffffffffffffffffffff"
													}
												],
												"functionName": {
													"name": "and",
													"nodeType": "YulIdentifier",
													"src": "400:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "400:54:22"
											},
											"variableNames": [
												{
													"name": "cleaned",
													"nodeType": "YulIdentifier",
													"src": "389:7:22"
												}
											]
										}
									]
								},
								"name": "cleanup_t_uint160",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "361:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "cleaned",
										"nodeType": "YulTypedName",
										"src": "371:7:22",
										"type": ""
									}
								],
								"src": "334:126:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "511:51:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "521:35:22",
											"value": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "550:5:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint160",
													"nodeType": "YulIdentifier",
													"src": "532:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "532:24:22"
											},
											"variableNames": [
												{
													"name": "cleaned",
													"nodeType": "YulIdentifier",
													"src": "521:7:22"
												}
											]
										}
									]
								},
								"name": "cleanup_t_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "493:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "cleaned",
										"nodeType": "YulTypedName",
										"src": "503:7:22",
										"type": ""
									}
								],
								"src": "466:96:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "611:79:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "668:16:22",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "677:1:22",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "680:1:22",
																	"type": "",
																	"value": "0"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "670:6:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "670:12:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "670:12:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "634:5:22"
															},
															{
																"arguments": [
																	{
																		"name": "value",
																		"nodeType": "YulIdentifier",
																		"src": "659:5:22"
																	}
																],
																"functionName": {
																	"name": "cleanup_t_address",
																	"nodeType": "YulIdentifier",
																	"src": "641:17:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "641:24:22"
															}
														],
														"functionName": {
															"name": "eq",
															"nodeType": "YulIdentifier",
															"src": "631:2:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "631:35:22"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "624:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "624:43:22"
											},
											"nodeType": "YulIf",
											"src": "621:63:22"
										}
									]
								},
								"name": "validator_revert_t_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "604:5:22",
										"type": ""
									}
								],
								"src": "568:122:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "759:80:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "769:22:22",
											"value": {
												"arguments": [
													{
														"name": "offset",
														"nodeType": "YulIdentifier",
														"src": "784:6:22"
													}
												],
												"functionName": {
													"name": "mload",
													"nodeType": "YulIdentifier",
													"src": "778:5:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "778:13:22"
											},
											"variableNames": [
												{
													"name": "value",
													"nodeType": "YulIdentifier",
													"src": "769:5:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "827:5:22"
													}
												],
												"functionName": {
													"name": "validator_revert_t_address",
													"nodeType": "YulIdentifier",
													"src": "800:26:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "800:33:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "800:33:22"
										}
									]
								},
								"name": "abi_decode_t_address_fromMemory",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "offset",
										"nodeType": "YulTypedName",
										"src": "737:6:22",
										"type": ""
									},
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "745:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "753:5:22",
										"type": ""
									}
								],
								"src": "696:143:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "922:274:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "968:83:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
																"nodeType": "YulIdentifier",
																"src": "970:77:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "970:79:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "970:79:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "943:7:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "952:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "939:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "939:23:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "964:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "slt",
													"nodeType": "YulIdentifier",
													"src": "935:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "935:32:22"
											},
											"nodeType": "YulIf",
											"src": "932:119:22"
										},
										{
											"nodeType": "YulBlock",
											"src": "1061:128:22",
											"statements": [
												{
													"nodeType": "YulVariableDeclaration",
													"src": "1076:15:22",
													"value": {
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1090:1:22",
														"type": "",
														"value": "0"
													},
													"variables": [
														{
															"name": "offset",
															"nodeType": "YulTypedName",
															"src": "1080:6:22",
															"type": ""
														}
													]
												},
												{
													"nodeType": "YulAssignment",
													"src": "1105:74:22",
													"value": {
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "headStart",
																		"nodeType": "YulIdentifier",
																		"src": "1151:9:22"
																	},
																	{
																		"name": "offset",
																		"nodeType": "YulIdentifier",
																		"src": "1162:6:22"
																	}
																],
																"functionName": {
																	"name": "add",
																	"nodeType": "YulIdentifier",
																	"src": "1147:3:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "1147:22:22"
															},
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "1171:7:22"
															}
														],
														"functionName": {
															"name": "abi_decode_t_address_fromMemory",
															"nodeType": "YulIdentifier",
															"src": "1115:31:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "1115:64:22"
													},
													"variableNames": [
														{
															"name": "value0",
															"nodeType": "YulIdentifier",
															"src": "1105:6:22"
														}
													]
												}
											]
										}
									]
								},
								"name": "abi_decode_tuple_t_address_fromMemory",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "892:9:22",
										"type": ""
									},
									{
										"name": "dataEnd",
										"nodeType": "YulTypedName",
										"src": "903:7:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "915:6:22",
										"type": ""
									}
								],
								"src": "845:351:22"
							}
						]
					},
					"contents": "{\n\n    function allocate_unbounded() -> memPtr {\n        memPtr := mload(64)\n    }\n\n    function revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() {\n        revert(0, 0)\n    }\n\n    function revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() {\n        revert(0, 0)\n    }\n\n    function cleanup_t_uint160(value) -> cleaned {\n        cleaned := and(value, 0xffffffffffffffffffffffffffffffffffffffff)\n    }\n\n    function cleanup_t_address(value) -> cleaned {\n        cleaned := cleanup_t_uint160(value)\n    }\n\n    function validator_revert_t_address(value) {\n        if iszero(eq(value, cleanup_t_address(value))) { revert(0, 0) }\n    }\n\n    function abi_decode_t_address_fromMemory(offset, end) -> value {\n        value := mload(offset)\n        validator_revert_t_address(value)\n    }\n\n    function abi_decode_tuple_t_address_fromMemory(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n}\n",
					"id": 22,
					"language": "Yul",
					"name": "#utility.yul"
				}
			],
			"linkReferences": {},
			"object": "60806040523480156200001157600080fd5b506040516200145f3803806200145f8339818101604052810190620000379190620001d5565b620000576200004b6200009f60201b60201c565b620000a760201b60201c565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505062000207565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200019d8262000170565b9050919050565b620001af8162000190565b8114620001bb57600080fd5b50565b600081519050620001cf81620001a4565b92915050565b600060208284031215620001ee57620001ed6200016b565b5b6000620001fe84828501620001be565b91505092915050565b61124880620002176000396000f3fe6080604052600436106100c65760003560e01c80638da5cb5b1161007f578063bf8ebd8511610059578063bf8ebd851461028d578063d0e30db0146102ca578063eb8bbd28146102d4578063f2fde38b146102ff576100e5565b80638da5cb5b146101fa578063968ed60014610225578063a888c2cd14610250576100e5565b80632c110641146100ea57806341c613831461012757806347ccca02146101525780636ba4c1381461017d5780636f8b65a4146101a6578063715018a6146101e3576100e5565b366100e55734600260008282546100dd9190610a78565b925050819055005b600080fd5b3480156100f657600080fd5b50610111600480360381019061010c9190610aec565b610328565b60405161011e9190610b28565b60405180910390f35b34801561013357600080fd5b5061013c610340565b6040516101499190610b28565b60405180910390f35b34801561015e57600080fd5b50610167610346565b6040516101749190610bc2565b60405180910390f35b34801561018957600080fd5b506101a4600480360381019061019f9190610d36565b61036c565b005b3480156101b257600080fd5b506101cd60048036038101906101c89190610dbd565b61072a565b6040516101da9190610b28565b60405180910390f35b3480156101ef57600080fd5b506101f8610742565b005b34801561020657600080fd5b5061020f610756565b60405161021c9190610df9565b60405180910390f35b34801561023157600080fd5b5061023a61077f565b6040516102479190610b28565b60405180910390f35b34801561025c57600080fd5b5061027760048036038101906102729190610aec565b610785565b6040516102849190610b28565b60405180910390f35b34801561029957600080fd5b506102b460048036038101906102af9190610dbd565b61079d565b6040516102c19190610b28565b60405180910390f35b6102d2610842565b005b3480156102e057600080fd5b506102e961085d565b6040516102f69190610b28565b60405180910390f35b34801561030b57600080fd5b5061032660048036038101906103219190610dbd565b610867565b005b60056020528060005260406000206000915090505481565b60035481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600190505b8251811161063057600083828151811061039157610390610e14565b5b602002602001015190503373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636352211e836040518263ffffffff1660e01b815260040161040d9190610b28565b602060405180830381865afa15801561042a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061044e9190610e58565b73ffffffffffffffffffffffffffffffffffffffff16146104a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049b90610f08565b60405180910390fd5b600060056000838152602001908152602001600020546002546104c79190610f28565b111561061c57683635c9adc5dea00000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610544573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105689190610f71565b683635c9adc5dea0000060056000858152602001908152602001600020546002546105939190610f28565b61059d9190610f9e565b6105a7919061100f565b6105b19190610f9e565b836105bc9190610a78565b9250826006600083815260200190815260200160002060008282546105e19190610a78565b92505081905550600254600560008381526020019081526020016000208190555082600360008282546106149190610a78565b925050819055505b50808061062890611040565b915050610374565b5060008111610674576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066b906110d4565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff1681615e4a9060405161069c90611125565b600060405180830381858888f193505050503d80600081146106da576040519150601f19603f3d011682016040523d82523d6000602084013e6106df565b606091505b50505042600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050565b60046020528060005260406000206000915090505481565b61074a6108f5565b6107546000610973565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60025481565b60066020528060005260406000206000915090505481565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231836040518263ffffffff1660e01b81526004016107fa9190610df9565b602060405180830381865afa158015610817573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061083b9190610f71565b9050919050565b34600260008282546108549190610a78565b92505081905550565b6000600254905090565b73791f1cfb231e7c75eee4b7f8913e3c2b3548eb9373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108e090611186565b60405180910390fd5b6108f281610973565b50565b6108fd610a37565b73ffffffffffffffffffffffffffffffffffffffff1661091b610756565b73ffffffffffffffffffffffffffffffffffffffff1614610971576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610968906111f2565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610a8382610a3f565b9150610a8e83610a3f565b9250828201905080821115610aa657610aa5610a49565b5b92915050565b6000604051905090565b600080fd5b600080fd5b610ac981610a3f565b8114610ad457600080fd5b50565b600081359050610ae681610ac0565b92915050565b600060208284031215610b0257610b01610ab6565b5b6000610b1084828501610ad7565b91505092915050565b610b2281610a3f565b82525050565b6000602082019050610b3d6000830184610b19565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000610b88610b83610b7e84610b43565b610b63565b610b43565b9050919050565b6000610b9a82610b6d565b9050919050565b6000610bac82610b8f565b9050919050565b610bbc81610ba1565b82525050565b6000602082019050610bd76000830184610bb3565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610c2b82610be2565b810181811067ffffffffffffffff82111715610c4a57610c49610bf3565b5b80604052505050565b6000610c5d610aac565b9050610c698282610c22565b919050565b600067ffffffffffffffff821115610c8957610c88610bf3565b5b602082029050602081019050919050565b600080fd5b6000610cb2610cad84610c6e565b610c53565b90508083825260208201905060208402830185811115610cd557610cd4610c9a565b5b835b81811015610cfe5780610cea8882610ad7565b845260208401935050602081019050610cd7565b5050509392505050565b600082601f830112610d1d57610d1c610bdd565b5b8135610d2d848260208601610c9f565b91505092915050565b600060208284031215610d4c57610d4b610ab6565b5b600082013567ffffffffffffffff811115610d6a57610d69610abb565b5b610d7684828501610d08565b91505092915050565b6000610d8a82610b43565b9050919050565b610d9a81610d7f565b8114610da557600080fd5b50565b600081359050610db781610d91565b92915050565b600060208284031215610dd357610dd2610ab6565b5b6000610de184828501610da8565b91505092915050565b610df381610d7f565b82525050565b6000602082019050610e0e6000830184610dea565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600081519050610e5281610d91565b92915050565b600060208284031215610e6e57610e6d610ab6565b5b6000610e7c84828501610e43565b91505092915050565b600082825260208201905092915050565b7f596f75206d75737420626520746865206f776e6572206f6620616e204e46542060008201527f746f20636c61696d2066756e64732e0000000000000000000000000000000000602082015250565b6000610ef2602f83610e85565b9150610efd82610e96565b604082019050919050565b60006020820190508181036000830152610f2181610ee5565b9050919050565b6000610f3382610a3f565b9150610f3e83610a3f565b9250828203905081811115610f5657610f55610a49565b5b92915050565b600081519050610f6b81610ac0565b92915050565b600060208284031215610f8757610f86610ab6565b5b6000610f9584828501610f5c565b91505092915050565b6000610fa982610a3f565b9150610fb483610a3f565b9250828202610fc281610a3f565b91508282048414831517610fd957610fd8610a49565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061101a82610a3f565b915061102583610a3f565b92508261103557611034610fe0565b5b828204905092915050565b600061104b82610a3f565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361107d5761107c610a49565b5b600182019050919050565b7f4e6f2066756e647320746f20636c61696d000000000000000000000000000000600082015250565b60006110be601183610e85565b91506110c982611088565b602082019050919050565b600060208201905081810360008301526110ed816110b1565b9050919050565b600081905092915050565b50565b600061110f6000836110f4565b915061111a826110ff565b600082019050919050565b600061113082611102565b9150819050919050565b7f6e6f000000000000000000000000000000000000000000000000000000000000600082015250565b6000611170600283610e85565b915061117b8261113a565b602082019050919050565b6000602082019050818103600083015261119f81611163565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006111dc602083610e85565b91506111e7826111a6565b602082019050919050565b6000602082019050818103600083015261120b816111cf565b905091905056fea2646970667358221220edbb22cf209edd5ae1e07d2888d426eba9d34f104c1cf4c08a40eb282c0ca65f64736f6c63430008110033",
			"opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH3 0x11 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD PUSH3 0x145F CODESIZE SUB DUP1 PUSH3 0x145F DUP4 CODECOPY DUP2 DUP2 ADD PUSH1 0x40 MSTORE DUP2 ADD SWAP1 PUSH3 0x37 SWAP2 SWAP1 PUSH3 0x1D5 JUMP JUMPDEST PUSH3 0x57 PUSH3 0x4B PUSH3 0x9F PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST PUSH3 0xA7 PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST DUP1 PUSH1 0x1 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP POP PUSH3 0x207 JUMP JUMPDEST PUSH1 0x0 CALLER SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP DUP2 PUSH1 0x0 DUP1 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 PUSH1 0x40 MLOAD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH3 0x19D DUP3 PUSH3 0x170 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH3 0x1AF DUP2 PUSH3 0x190 JUMP JUMPDEST DUP2 EQ PUSH3 0x1BB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP PUSH3 0x1CF DUP2 PUSH3 0x1A4 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH3 0x1EE JUMPI PUSH3 0x1ED PUSH3 0x16B JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH3 0x1FE DUP5 DUP3 DUP6 ADD PUSH3 0x1BE JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0x1248 DUP1 PUSH3 0x217 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0xC6 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x8DA5CB5B GT PUSH2 0x7F JUMPI DUP1 PUSH4 0xBF8EBD85 GT PUSH2 0x59 JUMPI DUP1 PUSH4 0xBF8EBD85 EQ PUSH2 0x28D JUMPI DUP1 PUSH4 0xD0E30DB0 EQ PUSH2 0x2CA JUMPI DUP1 PUSH4 0xEB8BBD28 EQ PUSH2 0x2D4 JUMPI DUP1 PUSH4 0xF2FDE38B EQ PUSH2 0x2FF JUMPI PUSH2 0xE5 JUMP JUMPDEST DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0x1FA JUMPI DUP1 PUSH4 0x968ED600 EQ PUSH2 0x225 JUMPI DUP1 PUSH4 0xA888C2CD EQ PUSH2 0x250 JUMPI PUSH2 0xE5 JUMP JUMPDEST DUP1 PUSH4 0x2C110641 EQ PUSH2 0xEA JUMPI DUP1 PUSH4 0x41C61383 EQ PUSH2 0x127 JUMPI DUP1 PUSH4 0x47CCCA02 EQ PUSH2 0x152 JUMPI DUP1 PUSH4 0x6BA4C138 EQ PUSH2 0x17D JUMPI DUP1 PUSH4 0x6F8B65A4 EQ PUSH2 0x1A6 JUMPI DUP1 PUSH4 0x715018A6 EQ PUSH2 0x1E3 JUMPI PUSH2 0xE5 JUMP JUMPDEST CALLDATASIZE PUSH2 0xE5 JUMPI CALLVALUE PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0xDD SWAP2 SWAP1 PUSH2 0xA78 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE STOP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0xF6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x111 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x10C SWAP2 SWAP1 PUSH2 0xAEC JUMP JUMPDEST PUSH2 0x328 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x11E SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x133 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x13C PUSH2 0x340 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x149 SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x15E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x167 PUSH2 0x346 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x174 SWAP2 SWAP1 PUSH2 0xBC2 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x189 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1A4 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x19F SWAP2 SWAP1 PUSH2 0xD36 JUMP JUMPDEST PUSH2 0x36C JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1B2 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1CD PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x1C8 SWAP2 SWAP1 PUSH2 0xDBD JUMP JUMPDEST PUSH2 0x72A JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x1DA SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1EF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1F8 PUSH2 0x742 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x206 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x20F PUSH2 0x756 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x21C SWAP2 SWAP1 PUSH2 0xDF9 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x231 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x23A PUSH2 0x77F JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x247 SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x25C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x277 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x272 SWAP2 SWAP1 PUSH2 0xAEC JUMP JUMPDEST PUSH2 0x785 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x284 SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x299 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x2B4 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x2AF SWAP2 SWAP1 PUSH2 0xDBD JUMP JUMPDEST PUSH2 0x79D JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x2C1 SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x2D2 PUSH2 0x842 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2E0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x2E9 PUSH2 0x85D JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x2F6 SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x30B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x326 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x321 SWAP2 SWAP1 PUSH2 0xDBD JUMP JUMPDEST PUSH2 0x867 JUMP JUMPDEST STOP JUMPDEST PUSH1 0x5 PUSH1 0x20 MSTORE DUP1 PUSH1 0x0 MSTORE PUSH1 0x40 PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP2 POP SWAP1 POP SLOAD DUP2 JUMP JUMPDEST PUSH1 0x3 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x1 SWAP1 POP JUMPDEST DUP3 MLOAD DUP2 GT PUSH2 0x630 JUMPI PUSH1 0x0 DUP4 DUP3 DUP2 MLOAD DUP2 LT PUSH2 0x391 JUMPI PUSH2 0x390 PUSH2 0xE14 JUMP JUMPDEST JUMPDEST PUSH1 0x20 MUL PUSH1 0x20 ADD ADD MLOAD SWAP1 POP CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x6352211E DUP4 PUSH1 0x40 MLOAD DUP3 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x40D SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x42A JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x44E SWAP2 SWAP1 PUSH2 0xE58 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x4A4 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x49B SWAP1 PUSH2 0xF08 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x5 PUSH1 0x0 DUP4 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH1 0x2 SLOAD PUSH2 0x4C7 SWAP2 SWAP1 PUSH2 0xF28 JUMP JUMPDEST GT ISZERO PUSH2 0x61C JUMPI PUSH9 0x3635C9ADC5DEA00000 PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x18160DDD PUSH1 0x40 MLOAD DUP2 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x544 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x568 SWAP2 SWAP1 PUSH2 0xF71 JUMP JUMPDEST PUSH9 0x3635C9ADC5DEA00000 PUSH1 0x5 PUSH1 0x0 DUP6 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH1 0x2 SLOAD PUSH2 0x593 SWAP2 SWAP1 PUSH2 0xF28 JUMP JUMPDEST PUSH2 0x59D SWAP2 SWAP1 PUSH2 0xF9E JUMP JUMPDEST PUSH2 0x5A7 SWAP2 SWAP1 PUSH2 0x100F JUMP JUMPDEST PUSH2 0x5B1 SWAP2 SWAP1 PUSH2 0xF9E JUMP JUMPDEST DUP4 PUSH2 0x5BC SWAP2 SWAP1 PUSH2 0xA78 JUMP JUMPDEST SWAP3 POP DUP3 PUSH1 0x6 PUSH1 0x0 DUP4 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x5E1 SWAP2 SWAP1 PUSH2 0xA78 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP PUSH1 0x2 SLOAD PUSH1 0x5 PUSH1 0x0 DUP4 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP DUP3 PUSH1 0x3 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x614 SWAP2 SWAP1 PUSH2 0xA78 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP JUMPDEST POP DUP1 DUP1 PUSH2 0x628 SWAP1 PUSH2 0x1040 JUMP JUMPDEST SWAP2 POP POP PUSH2 0x374 JUMP JUMPDEST POP PUSH1 0x0 DUP2 GT PUSH2 0x674 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x66B SWAP1 PUSH2 0x10D4 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH2 0x5E4A SWAP1 PUSH1 0x40 MLOAD PUSH2 0x69C SWAP1 PUSH2 0x1125 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x6DA JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x6DF JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP POP TIMESTAMP PUSH1 0x4 PUSH1 0x0 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP POP POP JUMP JUMPDEST PUSH1 0x4 PUSH1 0x20 MSTORE DUP1 PUSH1 0x0 MSTORE PUSH1 0x40 PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP2 POP SWAP1 POP SLOAD DUP2 JUMP JUMPDEST PUSH2 0x74A PUSH2 0x8F5 JUMP JUMPDEST PUSH2 0x754 PUSH1 0x0 PUSH2 0x973 JUMP JUMPDEST JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x2 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x6 PUSH1 0x20 MSTORE DUP1 PUSH1 0x0 MSTORE PUSH1 0x40 PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP2 POP SWAP1 POP SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x70A08231 DUP4 PUSH1 0x40 MLOAD DUP3 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x7FA SWAP2 SWAP1 PUSH2 0xDF9 JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x817 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x83B SWAP2 SWAP1 PUSH2 0xF71 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST CALLVALUE PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x854 SWAP2 SWAP1 PUSH2 0xA78 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH20 0x791F1CFB231E7C75EEE4B7F8913E3C2B3548EB93 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x8E9 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x8E0 SWAP1 PUSH2 0x1186 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x8F2 DUP2 PUSH2 0x973 JUMP JUMPDEST POP JUMP JUMPDEST PUSH2 0x8FD PUSH2 0xA37 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x91B PUSH2 0x756 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x971 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x968 SWAP1 PUSH2 0x11F2 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP DUP2 PUSH1 0x0 DUP1 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 PUSH1 0x40 MLOAD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH1 0x0 CALLER SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 PUSH2 0xA83 DUP3 PUSH2 0xA3F JUMP JUMPDEST SWAP2 POP PUSH2 0xA8E DUP4 PUSH2 0xA3F JUMP JUMPDEST SWAP3 POP DUP3 DUP3 ADD SWAP1 POP DUP1 DUP3 GT ISZERO PUSH2 0xAA6 JUMPI PUSH2 0xAA5 PUSH2 0xA49 JUMP JUMPDEST JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 MLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xAC9 DUP2 PUSH2 0xA3F JUMP JUMPDEST DUP2 EQ PUSH2 0xAD4 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0xAE6 DUP2 PUSH2 0xAC0 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xB02 JUMPI PUSH2 0xB01 PUSH2 0xAB6 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0xB10 DUP5 DUP3 DUP6 ADD PUSH2 0xAD7 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0xB22 DUP2 PUSH2 0xA3F JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xB3D PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xB19 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xB88 PUSH2 0xB83 PUSH2 0xB7E DUP5 PUSH2 0xB43 JUMP JUMPDEST PUSH2 0xB63 JUMP JUMPDEST PUSH2 0xB43 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xB9A DUP3 PUSH2 0xB6D JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xBAC DUP3 PUSH2 0xB8F JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0xBBC DUP2 PUSH2 0xBA1 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xBD7 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xBB3 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH2 0xC2B DUP3 PUSH2 0xBE2 JUMP JUMPDEST DUP2 ADD DUP2 DUP2 LT PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT OR ISZERO PUSH2 0xC4A JUMPI PUSH2 0xC49 PUSH2 0xBF3 JUMP JUMPDEST JUMPDEST DUP1 PUSH1 0x40 MSTORE POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xC5D PUSH2 0xAAC JUMP JUMPDEST SWAP1 POP PUSH2 0xC69 DUP3 DUP3 PUSH2 0xC22 JUMP JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT ISZERO PUSH2 0xC89 JUMPI PUSH2 0xC88 PUSH2 0xBF3 JUMP JUMPDEST JUMPDEST PUSH1 0x20 DUP3 MUL SWAP1 POP PUSH1 0x20 DUP2 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH2 0xCB2 PUSH2 0xCAD DUP5 PUSH2 0xC6E JUMP JUMPDEST PUSH2 0xC53 JUMP JUMPDEST SWAP1 POP DUP1 DUP4 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH1 0x20 DUP5 MUL DUP4 ADD DUP6 DUP2 GT ISZERO PUSH2 0xCD5 JUMPI PUSH2 0xCD4 PUSH2 0xC9A JUMP JUMPDEST JUMPDEST DUP4 JUMPDEST DUP2 DUP2 LT ISZERO PUSH2 0xCFE JUMPI DUP1 PUSH2 0xCEA DUP9 DUP3 PUSH2 0xAD7 JUMP JUMPDEST DUP5 MSTORE PUSH1 0x20 DUP5 ADD SWAP4 POP POP PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0xCD7 JUMP JUMPDEST POP POP POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH1 0x1F DUP4 ADD SLT PUSH2 0xD1D JUMPI PUSH2 0xD1C PUSH2 0xBDD JUMP JUMPDEST JUMPDEST DUP2 CALLDATALOAD PUSH2 0xD2D DUP5 DUP3 PUSH1 0x20 DUP7 ADD PUSH2 0xC9F JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xD4C JUMPI PUSH2 0xD4B PUSH2 0xAB6 JUMP JUMPDEST JUMPDEST PUSH1 0x0 DUP3 ADD CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0xD6A JUMPI PUSH2 0xD69 PUSH2 0xABB JUMP JUMPDEST JUMPDEST PUSH2 0xD76 DUP5 DUP3 DUP6 ADD PUSH2 0xD08 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xD8A DUP3 PUSH2 0xB43 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0xD9A DUP2 PUSH2 0xD7F JUMP JUMPDEST DUP2 EQ PUSH2 0xDA5 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0xDB7 DUP2 PUSH2 0xD91 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xDD3 JUMPI PUSH2 0xDD2 PUSH2 0xAB6 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0xDE1 DUP5 DUP3 DUP6 ADD PUSH2 0xDA8 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0xDF3 DUP2 PUSH2 0xD7F JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xE0E PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xDEA JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x32 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP PUSH2 0xE52 DUP2 PUSH2 0xD91 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xE6E JUMPI PUSH2 0xE6D PUSH2 0xAB6 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0xE7C DUP5 DUP3 DUP6 ADD PUSH2 0xE43 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x596F75206D75737420626520746865206F776E6572206F6620616E204E465420 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x746F20636C61696D2066756E64732E0000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xEF2 PUSH1 0x2F DUP4 PUSH2 0xE85 JUMP JUMPDEST SWAP2 POP PUSH2 0xEFD DUP3 PUSH2 0xE96 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xF21 DUP2 PUSH2 0xEE5 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xF33 DUP3 PUSH2 0xA3F JUMP JUMPDEST SWAP2 POP PUSH2 0xF3E DUP4 PUSH2 0xA3F JUMP JUMPDEST SWAP3 POP DUP3 DUP3 SUB SWAP1 POP DUP2 DUP2 GT ISZERO PUSH2 0xF56 JUMPI PUSH2 0xF55 PUSH2 0xA49 JUMP JUMPDEST JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP PUSH2 0xF6B DUP2 PUSH2 0xAC0 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xF87 JUMPI PUSH2 0xF86 PUSH2 0xAB6 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0xF95 DUP5 DUP3 DUP6 ADD PUSH2 0xF5C JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xFA9 DUP3 PUSH2 0xA3F JUMP JUMPDEST SWAP2 POP PUSH2 0xFB4 DUP4 PUSH2 0xA3F JUMP JUMPDEST SWAP3 POP DUP3 DUP3 MUL PUSH2 0xFC2 DUP2 PUSH2 0xA3F JUMP JUMPDEST SWAP2 POP DUP3 DUP3 DIV DUP5 EQ DUP4 ISZERO OR PUSH2 0xFD9 JUMPI PUSH2 0xFD8 PUSH2 0xA49 JUMP JUMPDEST JUMPDEST POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x12 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 PUSH2 0x101A DUP3 PUSH2 0xA3F JUMP JUMPDEST SWAP2 POP PUSH2 0x1025 DUP4 PUSH2 0xA3F JUMP JUMPDEST SWAP3 POP DUP3 PUSH2 0x1035 JUMPI PUSH2 0x1034 PUSH2 0xFE0 JUMP JUMPDEST JUMPDEST DUP3 DUP3 DIV SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x104B DUP3 PUSH2 0xA3F JUMP JUMPDEST SWAP2 POP PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 SUB PUSH2 0x107D JUMPI PUSH2 0x107C PUSH2 0xA49 JUMP JUMPDEST JUMPDEST PUSH1 0x1 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E6F2066756E647320746F20636C61696D000000000000000000000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x10BE PUSH1 0x11 DUP4 PUSH2 0xE85 JUMP JUMPDEST SWAP2 POP PUSH2 0x10C9 DUP3 PUSH2 0x1088 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x10ED DUP2 PUSH2 0x10B1 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x110F PUSH1 0x0 DUP4 PUSH2 0x10F4 JUMP JUMPDEST SWAP2 POP PUSH2 0x111A DUP3 PUSH2 0x10FF JUMP JUMPDEST PUSH1 0x0 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1130 DUP3 PUSH2 0x1102 JUMP JUMPDEST SWAP2 POP DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x6E6F000000000000000000000000000000000000000000000000000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1170 PUSH1 0x2 DUP4 PUSH2 0xE85 JUMP JUMPDEST SWAP2 POP PUSH2 0x117B DUP3 PUSH2 0x113A JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x119F DUP2 PUSH2 0x1163 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4F776E61626C653A2063616C6C6572206973206E6F7420746865206F776E6572 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x11DC PUSH1 0x20 DUP4 PUSH2 0xE85 JUMP JUMPDEST SWAP2 POP PUSH2 0x11E7 DUP3 PUSH2 0x11A6 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x120B DUP2 PUSH2 0x11CF JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xED 0xBB 0x22 0xCF KECCAK256 SWAP15 0xDD GAS 0xE1 0xE0 PUSH30 0x2888D426EBA9D34F104C1CF4C08A40EB282C0CA65F64736F6C6343000811 STOP CALLER ",
			"sourceMap": "111:3132:19:-:0;;;1200:72;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;936:32:0;955:12;:10;;;:12;;:::i;:::-;936:18;;;:32;;:::i;:::-;1255:11:19;1240:3;;:27;;;;;;;;;;;;;;;;;;1200:72;111:3132;;640:96:11;693:7;719:10;712:17;;640:96;:::o;2433:187:0:-;2506:16;2525:6;;;;;;;;;;;2506:25;;2550:8;2541:6;;:17;;;;;;;;;;;;;;;;;;2604:8;2573:40;;2594:8;2573:40;;;;;;;;;;;;2496:124;2433:187;:::o;88:117:22:-;197:1;194;187:12;334:126;371:7;411:42;404:5;400:54;389:65;;334:126;;;:::o;466:96::-;503:7;532:24;550:5;532:24;:::i;:::-;521:35;;466:96;;;:::o;568:122::-;641:24;659:5;641:24;:::i;:::-;634:5;631:35;621:63;;680:1;677;670:12;621:63;568:122;:::o;696:143::-;753:5;784:6;778:13;769:22;;800:33;827:5;800:33;:::i;:::-;696:143;;;;:::o;845:351::-;915:6;964:2;952:9;943:7;939:23;935:32;932:119;;;970:79;;:::i;:::-;932:119;1090:1;1115:64;1171:7;1162:6;1151:9;1147:22;1115:64;:::i;:::-;1105:74;;1061:128;845:351;;;;:::o;111:3132:19:-;;;;;;;"
		},
		"deployedBytecode": {
			"functionDebugData": {
				"@_4097": {
					"entryPoint": null,
					"id": 4097,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@_checkOwner_54": {
					"entryPoint": 2293,
					"id": 54,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@_msgSender_2419": {
					"entryPoint": 2615,
					"id": 2419,
					"parameterSlots": 0,
					"returnSlots": 1
				},
				"@_transferOwnership_111": {
					"entryPoint": 2419,
					"id": 111,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"@claimTimestamps_4049": {
					"entryPoint": 1834,
					"id": 4049,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@claim_4218": {
					"entryPoint": 876,
					"id": 4218,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"@claims_4057": {
					"entryPoint": 1925,
					"id": 4057,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@deposit_4106": {
					"entryPoint": 2114,
					"id": 4106,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@getNFTBalance_4239": {
					"entryPoint": 1949,
					"id": 4239,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"@getTotalFunds_4226": {
					"entryPoint": 2141,
					"id": 4226,
					"parameterSlots": 0,
					"returnSlots": 1
				},
				"@lastMark_4053": {
					"entryPoint": 808,
					"id": 4053,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@nft_4032": {
					"entryPoint": 838,
					"id": 4032,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@owner_40": {
					"entryPoint": 1878,
					"id": 40,
					"parameterSlots": 0,
					"returnSlots": 1
				},
				"@renounceOwnership_68": {
					"entryPoint": 1858,
					"id": 68,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@totalClaims_4045": {
					"entryPoint": 832,
					"id": 4045,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@totalFunds_4043": {
					"entryPoint": 1919,
					"id": 4043,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@transferOwnership_4076": {
					"entryPoint": 2151,
					"id": 4076,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"abi_decode_available_length_t_array$_t_uint256_$dyn_memory_ptr": {
					"entryPoint": 3231,
					"id": null,
					"parameterSlots": 3,
					"returnSlots": 1
				},
				"abi_decode_t_address": {
					"entryPoint": 3496,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_t_address_fromMemory": {
					"entryPoint": 3651,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_t_array$_t_uint256_$dyn_memory_ptr": {
					"entryPoint": 3336,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_t_uint256": {
					"entryPoint": 2775,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_t_uint256_fromMemory": {
					"entryPoint": 3932,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_tuple_t_address": {
					"entryPoint": 3517,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_tuple_t_address_fromMemory": {
					"entryPoint": 3672,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_tuple_t_array$_t_uint256_$dyn_memory_ptr": {
					"entryPoint": 3382,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_tuple_t_uint256": {
					"entryPoint": 2796,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_tuple_t_uint256_fromMemory": {
					"entryPoint": 3953,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_encode_t_address_to_t_address_fromStack": {
					"entryPoint": 3562,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 0
				},
				"abi_encode_t_contract$_GameItem_$4024_to_t_address_fromStack": {
					"entryPoint": 2995,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 0
				},
				"abi_encode_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d_to_t_string_memory_ptr_fromStack": {
					"entryPoint": 4273,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba_to_t_string_memory_ptr_fromStack": {
					"entryPoint": 4451,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe_to_t_string_memory_ptr_fromStack": {
					"entryPoint": 4559,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_t_stringliteral_9dfce18898f319dac950707b1f6cc7eb9f49bd986439db46948375872f7bd448_to_t_string_memory_ptr_fromStack": {
					"entryPoint": 3813,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470_to_t_bytes_memory_ptr_nonPadded_inplace_fromStack": {
					"entryPoint": 4354,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_t_uint256_to_t_uint256_fromStack": {
					"entryPoint": 2841,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 0
				},
				"abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed": {
					"entryPoint": 4389,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_address__to_t_address__fromStack_reversed": {
					"entryPoint": 3577,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_contract$_GameItem_$4024__to_t_address__fromStack_reversed": {
					"entryPoint": 3010,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": 4308,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": 4486,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": 4594,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_stringliteral_9dfce18898f319dac950707b1f6cc7eb9f49bd986439db46948375872f7bd448__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": 3848,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed": {
					"entryPoint": 2856,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"allocate_memory": {
					"entryPoint": 3155,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"allocate_unbounded": {
					"entryPoint": 2732,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 1
				},
				"array_allocation_size_t_array$_t_uint256_$dyn_memory_ptr": {
					"entryPoint": 3182,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"array_storeLengthForEncoding_t_bytes_memory_ptr_nonPadded_inplace_fromStack": {
					"entryPoint": 4340,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"array_storeLengthForEncoding_t_string_memory_ptr_fromStack": {
					"entryPoint": 3717,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"checked_add_t_uint256": {
					"entryPoint": 2680,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"checked_div_t_uint256": {
					"entryPoint": 4111,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"checked_mul_t_uint256": {
					"entryPoint": 3998,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"checked_sub_t_uint256": {
					"entryPoint": 3880,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"cleanup_t_address": {
					"entryPoint": 3455,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"cleanup_t_uint160": {
					"entryPoint": 2883,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"cleanup_t_uint256": {
					"entryPoint": 2623,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"convert_t_contract$_GameItem_$4024_to_t_address": {
					"entryPoint": 2977,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"convert_t_uint160_to_t_address": {
					"entryPoint": 2959,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"convert_t_uint160_to_t_uint160": {
					"entryPoint": 2925,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"finalize_allocation": {
					"entryPoint": 3106,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 0
				},
				"identity": {
					"entryPoint": 2915,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"increment_t_uint256": {
					"entryPoint": 4160,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"panic_error_0x11": {
					"entryPoint": 2633,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"panic_error_0x12": {
					"entryPoint": 4064,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"panic_error_0x32": {
					"entryPoint": 3604,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"panic_error_0x41": {
					"entryPoint": 3059,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d": {
					"entryPoint": 3037,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"revert_error_81385d8c0b31fffe14be1da910c8bd3a80be4cfa248e04f42ec0faea3132a8ef": {
					"entryPoint": 3226,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db": {
					"entryPoint": 2747,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b": {
					"entryPoint": 2742,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"round_up_to_mul_of_32": {
					"entryPoint": 3042,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"store_literal_in_memory_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d": {
					"entryPoint": 4232,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"store_literal_in_memory_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba": {
					"entryPoint": 4410,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"store_literal_in_memory_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe": {
					"entryPoint": 4518,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"store_literal_in_memory_9dfce18898f319dac950707b1f6cc7eb9f49bd986439db46948375872f7bd448": {
					"entryPoint": 3734,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"store_literal_in_memory_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470": {
					"entryPoint": 4351,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"validator_revert_t_address": {
					"entryPoint": 3473,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"validator_revert_t_uint256": {
					"entryPoint": 2752,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				}
			},
			"generatedSources": [
				{
					"ast": {
						"nodeType": "YulBlock",
						"src": "0:14442:22",
						"statements": [
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "52:32:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "62:16:22",
											"value": {
												"name": "value",
												"nodeType": "YulIdentifier",
												"src": "73:5:22"
											},
											"variableNames": [
												{
													"name": "cleaned",
													"nodeType": "YulIdentifier",
													"src": "62:7:22"
												}
											]
										}
									]
								},
								"name": "cleanup_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "34:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "cleaned",
										"nodeType": "YulTypedName",
										"src": "44:7:22",
										"type": ""
									}
								],
								"src": "7:77:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "118:152:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "135:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "138:77:22",
														"type": "",
														"value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "128:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "128:88:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "128:88:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "232:1:22",
														"type": "",
														"value": "4"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "235:4:22",
														"type": "",
														"value": "0x11"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "225:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "225:15:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "225:15:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "256:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "259:4:22",
														"type": "",
														"value": "0x24"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "249:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "249:15:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "249:15:22"
										}
									]
								},
								"name": "panic_error_0x11",
								"nodeType": "YulFunctionDefinition",
								"src": "90:180:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "320:147:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "330:25:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "353:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "335:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "335:20:22"
											},
											"variableNames": [
												{
													"name": "x",
													"nodeType": "YulIdentifier",
													"src": "330:1:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "364:25:22",
											"value": {
												"arguments": [
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "387:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "369:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "369:20:22"
											},
											"variableNames": [
												{
													"name": "y",
													"nodeType": "YulIdentifier",
													"src": "364:1:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "398:16:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "409:1:22"
													},
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "412:1:22"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "405:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "405:9:22"
											},
											"variableNames": [
												{
													"name": "sum",
													"nodeType": "YulIdentifier",
													"src": "398:3:22"
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "438:22:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x11",
																"nodeType": "YulIdentifier",
																"src": "440:16:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "440:18:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "440:18:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "430:1:22"
													},
													{
														"name": "sum",
														"nodeType": "YulIdentifier",
														"src": "433:3:22"
													}
												],
												"functionName": {
													"name": "gt",
													"nodeType": "YulIdentifier",
													"src": "427:2:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "427:10:22"
											},
											"nodeType": "YulIf",
											"src": "424:36:22"
										}
									]
								},
								"name": "checked_add_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "x",
										"nodeType": "YulTypedName",
										"src": "307:1:22",
										"type": ""
									},
									{
										"name": "y",
										"nodeType": "YulTypedName",
										"src": "310:1:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "sum",
										"nodeType": "YulTypedName",
										"src": "316:3:22",
										"type": ""
									}
								],
								"src": "276:191:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "513:35:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "523:19:22",
											"value": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "539:2:22",
														"type": "",
														"value": "64"
													}
												],
												"functionName": {
													"name": "mload",
													"nodeType": "YulIdentifier",
													"src": "533:5:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "533:9:22"
											},
											"variableNames": [
												{
													"name": "memPtr",
													"nodeType": "YulIdentifier",
													"src": "523:6:22"
												}
											]
										}
									]
								},
								"name": "allocate_unbounded",
								"nodeType": "YulFunctionDefinition",
								"returnVariables": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "506:6:22",
										"type": ""
									}
								],
								"src": "473:75:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "643:28:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "660:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "663:1:22",
														"type": "",
														"value": "0"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "653:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "653:12:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "653:12:22"
										}
									]
								},
								"name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
								"nodeType": "YulFunctionDefinition",
								"src": "554:117:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "766:28:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "783:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "786:1:22",
														"type": "",
														"value": "0"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "776:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "776:12:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "776:12:22"
										}
									]
								},
								"name": "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db",
								"nodeType": "YulFunctionDefinition",
								"src": "677:117:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "843:79:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "900:16:22",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "909:1:22",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "912:1:22",
																	"type": "",
																	"value": "0"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "902:6:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "902:12:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "902:12:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "866:5:22"
															},
															{
																"arguments": [
																	{
																		"name": "value",
																		"nodeType": "YulIdentifier",
																		"src": "891:5:22"
																	}
																],
																"functionName": {
																	"name": "cleanup_t_uint256",
																	"nodeType": "YulIdentifier",
																	"src": "873:17:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "873:24:22"
															}
														],
														"functionName": {
															"name": "eq",
															"nodeType": "YulIdentifier",
															"src": "863:2:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "863:35:22"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "856:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "856:43:22"
											},
											"nodeType": "YulIf",
											"src": "853:63:22"
										}
									]
								},
								"name": "validator_revert_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "836:5:22",
										"type": ""
									}
								],
								"src": "800:122:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "980:87:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "990:29:22",
											"value": {
												"arguments": [
													{
														"name": "offset",
														"nodeType": "YulIdentifier",
														"src": "1012:6:22"
													}
												],
												"functionName": {
													"name": "calldataload",
													"nodeType": "YulIdentifier",
													"src": "999:12:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "999:20:22"
											},
											"variableNames": [
												{
													"name": "value",
													"nodeType": "YulIdentifier",
													"src": "990:5:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "1055:5:22"
													}
												],
												"functionName": {
													"name": "validator_revert_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "1028:26:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "1028:33:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "1028:33:22"
										}
									]
								},
								"name": "abi_decode_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "offset",
										"nodeType": "YulTypedName",
										"src": "958:6:22",
										"type": ""
									},
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "966:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "974:5:22",
										"type": ""
									}
								],
								"src": "928:139:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1139:263:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "1185:83:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
																"nodeType": "YulIdentifier",
																"src": "1187:77:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "1187:79:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "1187:79:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "1160:7:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "1169:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "1156:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "1156:23:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1181:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "slt",
													"nodeType": "YulIdentifier",
													"src": "1152:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "1152:32:22"
											},
											"nodeType": "YulIf",
											"src": "1149:119:22"
										},
										{
											"nodeType": "YulBlock",
											"src": "1278:117:22",
											"statements": [
												{
													"nodeType": "YulVariableDeclaration",
													"src": "1293:15:22",
													"value": {
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1307:1:22",
														"type": "",
														"value": "0"
													},
													"variables": [
														{
															"name": "offset",
															"nodeType": "YulTypedName",
															"src": "1297:6:22",
															"type": ""
														}
													]
												},
												{
													"nodeType": "YulAssignment",
													"src": "1322:63:22",
													"value": {
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "headStart",
																		"nodeType": "YulIdentifier",
																		"src": "1357:9:22"
																	},
																	{
																		"name": "offset",
																		"nodeType": "YulIdentifier",
																		"src": "1368:6:22"
																	}
																],
																"functionName": {
																	"name": "add",
																	"nodeType": "YulIdentifier",
																	"src": "1353:3:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "1353:22:22"
															},
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "1377:7:22"
															}
														],
														"functionName": {
															"name": "abi_decode_t_uint256",
															"nodeType": "YulIdentifier",
															"src": "1332:20:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "1332:53:22"
													},
													"variableNames": [
														{
															"name": "value0",
															"nodeType": "YulIdentifier",
															"src": "1322:6:22"
														}
													]
												}
											]
										}
									]
								},
								"name": "abi_decode_tuple_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "1109:9:22",
										"type": ""
									},
									{
										"name": "dataEnd",
										"nodeType": "YulTypedName",
										"src": "1120:7:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "1132:6:22",
										"type": ""
									}
								],
								"src": "1073:329:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1473:53:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "1490:3:22"
													},
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "1513:5:22"
															}
														],
														"functionName": {
															"name": "cleanup_t_uint256",
															"nodeType": "YulIdentifier",
															"src": "1495:17:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "1495:24:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "1483:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "1483:37:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "1483:37:22"
										}
									]
								},
								"name": "abi_encode_t_uint256_to_t_uint256_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "1461:5:22",
										"type": ""
									},
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "1468:3:22",
										"type": ""
									}
								],
								"src": "1408:118:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1630:124:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "1640:26:22",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "1652:9:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1663:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "1648:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "1648:18:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "1640:4:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "value0",
														"nodeType": "YulIdentifier",
														"src": "1720:6:22"
													},
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "1733:9:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "1744:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "1729:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "1729:17:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_uint256_to_t_uint256_fromStack",
													"nodeType": "YulIdentifier",
													"src": "1676:43:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "1676:71:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "1676:71:22"
										}
									]
								},
								"name": "abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "1602:9:22",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "1614:6:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "1625:4:22",
										"type": ""
									}
								],
								"src": "1532:222:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1805:81:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "1815:65:22",
											"value": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "1830:5:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1837:42:22",
														"type": "",
														"value": "0xffffffffffffffffffffffffffffffffffffffff"
													}
												],
												"functionName": {
													"name": "and",
													"nodeType": "YulIdentifier",
													"src": "1826:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "1826:54:22"
											},
											"variableNames": [
												{
													"name": "cleaned",
													"nodeType": "YulIdentifier",
													"src": "1815:7:22"
												}
											]
										}
									]
								},
								"name": "cleanup_t_uint160",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "1787:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "cleaned",
										"nodeType": "YulTypedName",
										"src": "1797:7:22",
										"type": ""
									}
								],
								"src": "1760:126:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1924:28:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "1934:12:22",
											"value": {
												"name": "value",
												"nodeType": "YulIdentifier",
												"src": "1941:5:22"
											},
											"variableNames": [
												{
													"name": "ret",
													"nodeType": "YulIdentifier",
													"src": "1934:3:22"
												}
											]
										}
									]
								},
								"name": "identity",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "1910:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "ret",
										"nodeType": "YulTypedName",
										"src": "1920:3:22",
										"type": ""
									}
								],
								"src": "1892:60:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2018:82:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "2028:66:22",
											"value": {
												"arguments": [
													{
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "value",
																		"nodeType": "YulIdentifier",
																		"src": "2086:5:22"
																	}
																],
																"functionName": {
																	"name": "cleanup_t_uint160",
																	"nodeType": "YulIdentifier",
																	"src": "2068:17:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "2068:24:22"
															}
														],
														"functionName": {
															"name": "identity",
															"nodeType": "YulIdentifier",
															"src": "2059:8:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "2059:34:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint160",
													"nodeType": "YulIdentifier",
													"src": "2041:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "2041:53:22"
											},
											"variableNames": [
												{
													"name": "converted",
													"nodeType": "YulIdentifier",
													"src": "2028:9:22"
												}
											]
										}
									]
								},
								"name": "convert_t_uint160_to_t_uint160",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "1998:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "converted",
										"nodeType": "YulTypedName",
										"src": "2008:9:22",
										"type": ""
									}
								],
								"src": "1958:142:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2166:66:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "2176:50:22",
											"value": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "2220:5:22"
													}
												],
												"functionName": {
													"name": "convert_t_uint160_to_t_uint160",
													"nodeType": "YulIdentifier",
													"src": "2189:30:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "2189:37:22"
											},
											"variableNames": [
												{
													"name": "converted",
													"nodeType": "YulIdentifier",
													"src": "2176:9:22"
												}
											]
										}
									]
								},
								"name": "convert_t_uint160_to_t_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "2146:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "converted",
										"nodeType": "YulTypedName",
										"src": "2156:9:22",
										"type": ""
									}
								],
								"src": "2106:126:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2315:66:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "2325:50:22",
											"value": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "2369:5:22"
													}
												],
												"functionName": {
													"name": "convert_t_uint160_to_t_address",
													"nodeType": "YulIdentifier",
													"src": "2338:30:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "2338:37:22"
											},
											"variableNames": [
												{
													"name": "converted",
													"nodeType": "YulIdentifier",
													"src": "2325:9:22"
												}
											]
										}
									]
								},
								"name": "convert_t_contract$_GameItem_$4024_to_t_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "2295:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "converted",
										"nodeType": "YulTypedName",
										"src": "2305:9:22",
										"type": ""
									}
								],
								"src": "2238:143:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2469:83:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "2486:3:22"
													},
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "2539:5:22"
															}
														],
														"functionName": {
															"name": "convert_t_contract$_GameItem_$4024_to_t_address",
															"nodeType": "YulIdentifier",
															"src": "2491:47:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "2491:54:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "2479:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "2479:67:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "2479:67:22"
										}
									]
								},
								"name": "abi_encode_t_contract$_GameItem_$4024_to_t_address_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "2457:5:22",
										"type": ""
									},
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "2464:3:22",
										"type": ""
									}
								],
								"src": "2387:165:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2673:141:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "2683:26:22",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "2695:9:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "2706:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "2691:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "2691:18:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "2683:4:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "value0",
														"nodeType": "YulIdentifier",
														"src": "2780:6:22"
													},
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "2793:9:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "2804:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "2789:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "2789:17:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_contract$_GameItem_$4024_to_t_address_fromStack",
													"nodeType": "YulIdentifier",
													"src": "2719:60:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "2719:88:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "2719:88:22"
										}
									]
								},
								"name": "abi_encode_tuple_t_contract$_GameItem_$4024__to_t_address__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "2645:9:22",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "2657:6:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "2668:4:22",
										"type": ""
									}
								],
								"src": "2558:256:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2909:28:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "2926:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "2929:1:22",
														"type": "",
														"value": "0"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "2919:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "2919:12:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "2919:12:22"
										}
									]
								},
								"name": "revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d",
								"nodeType": "YulFunctionDefinition",
								"src": "2820:117:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2991:54:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "3001:38:22",
											"value": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "3019:5:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "3026:2:22",
																"type": "",
																"value": "31"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "3015:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "3015:14:22"
													},
													{
														"arguments": [
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "3035:2:22",
																"type": "",
																"value": "31"
															}
														],
														"functionName": {
															"name": "not",
															"nodeType": "YulIdentifier",
															"src": "3031:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "3031:7:22"
													}
												],
												"functionName": {
													"name": "and",
													"nodeType": "YulIdentifier",
													"src": "3011:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3011:28:22"
											},
											"variableNames": [
												{
													"name": "result",
													"nodeType": "YulIdentifier",
													"src": "3001:6:22"
												}
											]
										}
									]
								},
								"name": "round_up_to_mul_of_32",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "2974:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "result",
										"nodeType": "YulTypedName",
										"src": "2984:6:22",
										"type": ""
									}
								],
								"src": "2943:102:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "3079:152:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3096:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3099:77:22",
														"type": "",
														"value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "3089:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3089:88:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "3089:88:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3193:1:22",
														"type": "",
														"value": "4"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3196:4:22",
														"type": "",
														"value": "0x41"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "3186:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3186:15:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "3186:15:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3217:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3220:4:22",
														"type": "",
														"value": "0x24"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "3210:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3210:15:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "3210:15:22"
										}
									]
								},
								"name": "panic_error_0x41",
								"nodeType": "YulFunctionDefinition",
								"src": "3051:180:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "3280:238:22",
									"statements": [
										{
											"nodeType": "YulVariableDeclaration",
											"src": "3290:58:22",
											"value": {
												"arguments": [
													{
														"name": "memPtr",
														"nodeType": "YulIdentifier",
														"src": "3312:6:22"
													},
													{
														"arguments": [
															{
																"name": "size",
																"nodeType": "YulIdentifier",
																"src": "3342:4:22"
															}
														],
														"functionName": {
															"name": "round_up_to_mul_of_32",
															"nodeType": "YulIdentifier",
															"src": "3320:21:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "3320:27:22"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "3308:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3308:40:22"
											},
											"variables": [
												{
													"name": "newFreePtr",
													"nodeType": "YulTypedName",
													"src": "3294:10:22",
													"type": ""
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "3459:22:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x41",
																"nodeType": "YulIdentifier",
																"src": "3461:16:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "3461:18:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "3461:18:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "newFreePtr",
																"nodeType": "YulIdentifier",
																"src": "3402:10:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "3414:18:22",
																"type": "",
																"value": "0xffffffffffffffff"
															}
														],
														"functionName": {
															"name": "gt",
															"nodeType": "YulIdentifier",
															"src": "3399:2:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "3399:34:22"
													},
													{
														"arguments": [
															{
																"name": "newFreePtr",
																"nodeType": "YulIdentifier",
																"src": "3438:10:22"
															},
															{
																"name": "memPtr",
																"nodeType": "YulIdentifier",
																"src": "3450:6:22"
															}
														],
														"functionName": {
															"name": "lt",
															"nodeType": "YulIdentifier",
															"src": "3435:2:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "3435:22:22"
													}
												],
												"functionName": {
													"name": "or",
													"nodeType": "YulIdentifier",
													"src": "3396:2:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3396:62:22"
											},
											"nodeType": "YulIf",
											"src": "3393:88:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3497:2:22",
														"type": "",
														"value": "64"
													},
													{
														"name": "newFreePtr",
														"nodeType": "YulIdentifier",
														"src": "3501:10:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "3490:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3490:22:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "3490:22:22"
										}
									]
								},
								"name": "finalize_allocation",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "3266:6:22",
										"type": ""
									},
									{
										"name": "size",
										"nodeType": "YulTypedName",
										"src": "3274:4:22",
										"type": ""
									}
								],
								"src": "3237:281:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "3565:88:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "3575:30:22",
											"value": {
												"arguments": [],
												"functionName": {
													"name": "allocate_unbounded",
													"nodeType": "YulIdentifier",
													"src": "3585:18:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3585:20:22"
											},
											"variableNames": [
												{
													"name": "memPtr",
													"nodeType": "YulIdentifier",
													"src": "3575:6:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "memPtr",
														"nodeType": "YulIdentifier",
														"src": "3634:6:22"
													},
													{
														"name": "size",
														"nodeType": "YulIdentifier",
														"src": "3642:4:22"
													}
												],
												"functionName": {
													"name": "finalize_allocation",
													"nodeType": "YulIdentifier",
													"src": "3614:19:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3614:33:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "3614:33:22"
										}
									]
								},
								"name": "allocate_memory",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "size",
										"nodeType": "YulTypedName",
										"src": "3549:4:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "3558:6:22",
										"type": ""
									}
								],
								"src": "3524:129:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "3741:229:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "3846:22:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x41",
																"nodeType": "YulIdentifier",
																"src": "3848:16:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "3848:18:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "3848:18:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "length",
														"nodeType": "YulIdentifier",
														"src": "3818:6:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3826:18:22",
														"type": "",
														"value": "0xffffffffffffffff"
													}
												],
												"functionName": {
													"name": "gt",
													"nodeType": "YulIdentifier",
													"src": "3815:2:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3815:30:22"
											},
											"nodeType": "YulIf",
											"src": "3812:56:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "3878:25:22",
											"value": {
												"arguments": [
													{
														"name": "length",
														"nodeType": "YulIdentifier",
														"src": "3890:6:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3898:4:22",
														"type": "",
														"value": "0x20"
													}
												],
												"functionName": {
													"name": "mul",
													"nodeType": "YulIdentifier",
													"src": "3886:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3886:17:22"
											},
											"variableNames": [
												{
													"name": "size",
													"nodeType": "YulIdentifier",
													"src": "3878:4:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "3940:23:22",
											"value": {
												"arguments": [
													{
														"name": "size",
														"nodeType": "YulIdentifier",
														"src": "3952:4:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3958:4:22",
														"type": "",
														"value": "0x20"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "3948:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3948:15:22"
											},
											"variableNames": [
												{
													"name": "size",
													"nodeType": "YulIdentifier",
													"src": "3940:4:22"
												}
											]
										}
									]
								},
								"name": "array_allocation_size_t_array$_t_uint256_$dyn_memory_ptr",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "length",
										"nodeType": "YulTypedName",
										"src": "3725:6:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "size",
										"nodeType": "YulTypedName",
										"src": "3736:4:22",
										"type": ""
									}
								],
								"src": "3659:311:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "4065:28:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4082:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4085:1:22",
														"type": "",
														"value": "0"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "4075:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4075:12:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4075:12:22"
										}
									]
								},
								"name": "revert_error_81385d8c0b31fffe14be1da910c8bd3a80be4cfa248e04f42ec0faea3132a8ef",
								"nodeType": "YulFunctionDefinition",
								"src": "3976:117:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "4218:608:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "4228:90:22",
											"value": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "length",
																"nodeType": "YulIdentifier",
																"src": "4310:6:22"
															}
														],
														"functionName": {
															"name": "array_allocation_size_t_array$_t_uint256_$dyn_memory_ptr",
															"nodeType": "YulIdentifier",
															"src": "4253:56:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "4253:64:22"
													}
												],
												"functionName": {
													"name": "allocate_memory",
													"nodeType": "YulIdentifier",
													"src": "4237:15:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4237:81:22"
											},
											"variableNames": [
												{
													"name": "array",
													"nodeType": "YulIdentifier",
													"src": "4228:5:22"
												}
											]
										},
										{
											"nodeType": "YulVariableDeclaration",
											"src": "4327:16:22",
											"value": {
												"name": "array",
												"nodeType": "YulIdentifier",
												"src": "4338:5:22"
											},
											"variables": [
												{
													"name": "dst",
													"nodeType": "YulTypedName",
													"src": "4331:3:22",
													"type": ""
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "array",
														"nodeType": "YulIdentifier",
														"src": "4360:5:22"
													},
													{
														"name": "length",
														"nodeType": "YulIdentifier",
														"src": "4367:6:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "4353:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4353:21:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4353:21:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "4383:23:22",
											"value": {
												"arguments": [
													{
														"name": "array",
														"nodeType": "YulIdentifier",
														"src": "4394:5:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4401:4:22",
														"type": "",
														"value": "0x20"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "4390:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4390:16:22"
											},
											"variableNames": [
												{
													"name": "dst",
													"nodeType": "YulIdentifier",
													"src": "4383:3:22"
												}
											]
										},
										{
											"nodeType": "YulVariableDeclaration",
											"src": "4416:44:22",
											"value": {
												"arguments": [
													{
														"name": "offset",
														"nodeType": "YulIdentifier",
														"src": "4434:6:22"
													},
													{
														"arguments": [
															{
																"name": "length",
																"nodeType": "YulIdentifier",
																"src": "4446:6:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "4454:4:22",
																"type": "",
																"value": "0x20"
															}
														],
														"functionName": {
															"name": "mul",
															"nodeType": "YulIdentifier",
															"src": "4442:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "4442:17:22"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "4430:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4430:30:22"
											},
											"variables": [
												{
													"name": "srcEnd",
													"nodeType": "YulTypedName",
													"src": "4420:6:22",
													"type": ""
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "4488:103:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "revert_error_81385d8c0b31fffe14be1da910c8bd3a80be4cfa248e04f42ec0faea3132a8ef",
																"nodeType": "YulIdentifier",
																"src": "4502:77:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "4502:79:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "4502:79:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "srcEnd",
														"nodeType": "YulIdentifier",
														"src": "4475:6:22"
													},
													{
														"name": "end",
														"nodeType": "YulIdentifier",
														"src": "4483:3:22"
													}
												],
												"functionName": {
													"name": "gt",
													"nodeType": "YulIdentifier",
													"src": "4472:2:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4472:15:22"
											},
											"nodeType": "YulIf",
											"src": "4469:122:22"
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "4676:144:22",
												"statements": [
													{
														"nodeType": "YulVariableDeclaration",
														"src": "4691:21:22",
														"value": {
															"name": "src",
															"nodeType": "YulIdentifier",
															"src": "4709:3:22"
														},
														"variables": [
															{
																"name": "elementPos",
																"nodeType": "YulTypedName",
																"src": "4695:10:22",
																"type": ""
															}
														]
													},
													{
														"expression": {
															"arguments": [
																{
																	"name": "dst",
																	"nodeType": "YulIdentifier",
																	"src": "4733:3:22"
																},
																{
																	"arguments": [
																		{
																			"name": "elementPos",
																			"nodeType": "YulIdentifier",
																			"src": "4759:10:22"
																		},
																		{
																			"name": "end",
																			"nodeType": "YulIdentifier",
																			"src": "4771:3:22"
																		}
																	],
																	"functionName": {
																		"name": "abi_decode_t_uint256",
																		"nodeType": "YulIdentifier",
																		"src": "4738:20:22"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "4738:37:22"
																}
															],
															"functionName": {
																"name": "mstore",
																"nodeType": "YulIdentifier",
																"src": "4726:6:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "4726:50:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "4726:50:22"
													},
													{
														"nodeType": "YulAssignment",
														"src": "4789:21:22",
														"value": {
															"arguments": [
																{
																	"name": "dst",
																	"nodeType": "YulIdentifier",
																	"src": "4800:3:22"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "4805:4:22",
																	"type": "",
																	"value": "0x20"
																}
															],
															"functionName": {
																"name": "add",
																"nodeType": "YulIdentifier",
																"src": "4796:3:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "4796:14:22"
														},
														"variableNames": [
															{
																"name": "dst",
																"nodeType": "YulIdentifier",
																"src": "4789:3:22"
															}
														]
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "src",
														"nodeType": "YulIdentifier",
														"src": "4629:3:22"
													},
													{
														"name": "srcEnd",
														"nodeType": "YulIdentifier",
														"src": "4634:6:22"
													}
												],
												"functionName": {
													"name": "lt",
													"nodeType": "YulIdentifier",
													"src": "4626:2:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4626:15:22"
											},
											"nodeType": "YulForLoop",
											"post": {
												"nodeType": "YulBlock",
												"src": "4642:25:22",
												"statements": [
													{
														"nodeType": "YulAssignment",
														"src": "4644:21:22",
														"value": {
															"arguments": [
																{
																	"name": "src",
																	"nodeType": "YulIdentifier",
																	"src": "4655:3:22"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "4660:4:22",
																	"type": "",
																	"value": "0x20"
																}
															],
															"functionName": {
																"name": "add",
																"nodeType": "YulIdentifier",
																"src": "4651:3:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "4651:14:22"
														},
														"variableNames": [
															{
																"name": "src",
																"nodeType": "YulIdentifier",
																"src": "4644:3:22"
															}
														]
													}
												]
											},
											"pre": {
												"nodeType": "YulBlock",
												"src": "4604:21:22",
												"statements": [
													{
														"nodeType": "YulVariableDeclaration",
														"src": "4606:17:22",
														"value": {
															"name": "offset",
															"nodeType": "YulIdentifier",
															"src": "4617:6:22"
														},
														"variables": [
															{
																"name": "src",
																"nodeType": "YulTypedName",
																"src": "4610:3:22",
																"type": ""
															}
														]
													}
												]
											},
											"src": "4600:220:22"
										}
									]
								},
								"name": "abi_decode_available_length_t_array$_t_uint256_$dyn_memory_ptr",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "offset",
										"nodeType": "YulTypedName",
										"src": "4188:6:22",
										"type": ""
									},
									{
										"name": "length",
										"nodeType": "YulTypedName",
										"src": "4196:6:22",
										"type": ""
									},
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "4204:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "array",
										"nodeType": "YulTypedName",
										"src": "4212:5:22",
										"type": ""
									}
								],
								"src": "4116:710:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "4926:293:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "4975:83:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d",
																"nodeType": "YulIdentifier",
																"src": "4977:77:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "4977:79:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "4977:79:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "offset",
																		"nodeType": "YulIdentifier",
																		"src": "4954:6:22"
																	},
																	{
																		"kind": "number",
																		"nodeType": "YulLiteral",
																		"src": "4962:4:22",
																		"type": "",
																		"value": "0x1f"
																	}
																],
																"functionName": {
																	"name": "add",
																	"nodeType": "YulIdentifier",
																	"src": "4950:3:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "4950:17:22"
															},
															{
																"name": "end",
																"nodeType": "YulIdentifier",
																"src": "4969:3:22"
															}
														],
														"functionName": {
															"name": "slt",
															"nodeType": "YulIdentifier",
															"src": "4946:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "4946:27:22"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "4939:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4939:35:22"
											},
											"nodeType": "YulIf",
											"src": "4936:122:22"
										},
										{
											"nodeType": "YulVariableDeclaration",
											"src": "5067:34:22",
											"value": {
												"arguments": [
													{
														"name": "offset",
														"nodeType": "YulIdentifier",
														"src": "5094:6:22"
													}
												],
												"functionName": {
													"name": "calldataload",
													"nodeType": "YulIdentifier",
													"src": "5081:12:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5081:20:22"
											},
											"variables": [
												{
													"name": "length",
													"nodeType": "YulTypedName",
													"src": "5071:6:22",
													"type": ""
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "5110:103:22",
											"value": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "offset",
																"nodeType": "YulIdentifier",
																"src": "5186:6:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "5194:4:22",
																"type": "",
																"value": "0x20"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "5182:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "5182:17:22"
													},
													{
														"name": "length",
														"nodeType": "YulIdentifier",
														"src": "5201:6:22"
													},
													{
														"name": "end",
														"nodeType": "YulIdentifier",
														"src": "5209:3:22"
													}
												],
												"functionName": {
													"name": "abi_decode_available_length_t_array$_t_uint256_$dyn_memory_ptr",
													"nodeType": "YulIdentifier",
													"src": "5119:62:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5119:94:22"
											},
											"variableNames": [
												{
													"name": "array",
													"nodeType": "YulIdentifier",
													"src": "5110:5:22"
												}
											]
										}
									]
								},
								"name": "abi_decode_t_array$_t_uint256_$dyn_memory_ptr",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "offset",
										"nodeType": "YulTypedName",
										"src": "4904:6:22",
										"type": ""
									},
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "4912:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "array",
										"nodeType": "YulTypedName",
										"src": "4920:5:22",
										"type": ""
									}
								],
								"src": "4849:370:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "5316:448:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "5362:83:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
																"nodeType": "YulIdentifier",
																"src": "5364:77:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "5364:79:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "5364:79:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "5337:7:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "5346:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "5333:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "5333:23:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "5358:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "slt",
													"nodeType": "YulIdentifier",
													"src": "5329:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5329:32:22"
											},
											"nodeType": "YulIf",
											"src": "5326:119:22"
										},
										{
											"nodeType": "YulBlock",
											"src": "5455:302:22",
											"statements": [
												{
													"nodeType": "YulVariableDeclaration",
													"src": "5470:45:22",
													"value": {
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "headStart",
																		"nodeType": "YulIdentifier",
																		"src": "5501:9:22"
																	},
																	{
																		"kind": "number",
																		"nodeType": "YulLiteral",
																		"src": "5512:1:22",
																		"type": "",
																		"value": "0"
																	}
																],
																"functionName": {
																	"name": "add",
																	"nodeType": "YulIdentifier",
																	"src": "5497:3:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "5497:17:22"
															}
														],
														"functionName": {
															"name": "calldataload",
															"nodeType": "YulIdentifier",
															"src": "5484:12:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "5484:31:22"
													},
													"variables": [
														{
															"name": "offset",
															"nodeType": "YulTypedName",
															"src": "5474:6:22",
															"type": ""
														}
													]
												},
												{
													"body": {
														"nodeType": "YulBlock",
														"src": "5562:83:22",
														"statements": [
															{
																"expression": {
																	"arguments": [],
																	"functionName": {
																		"name": "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db",
																		"nodeType": "YulIdentifier",
																		"src": "5564:77:22"
																	},
																	"nodeType": "YulFunctionCall",
																	"src": "5564:79:22"
																},
																"nodeType": "YulExpressionStatement",
																"src": "5564:79:22"
															}
														]
													},
													"condition": {
														"arguments": [
															{
																"name": "offset",
																"nodeType": "YulIdentifier",
																"src": "5534:6:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "5542:18:22",
																"type": "",
																"value": "0xffffffffffffffff"
															}
														],
														"functionName": {
															"name": "gt",
															"nodeType": "YulIdentifier",
															"src": "5531:2:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "5531:30:22"
													},
													"nodeType": "YulIf",
													"src": "5528:117:22"
												},
												{
													"nodeType": "YulAssignment",
													"src": "5659:88:22",
													"value": {
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "headStart",
																		"nodeType": "YulIdentifier",
																		"src": "5719:9:22"
																	},
																	{
																		"name": "offset",
																		"nodeType": "YulIdentifier",
																		"src": "5730:6:22"
																	}
																],
																"functionName": {
																	"name": "add",
																	"nodeType": "YulIdentifier",
																	"src": "5715:3:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "5715:22:22"
															},
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "5739:7:22"
															}
														],
														"functionName": {
															"name": "abi_decode_t_array$_t_uint256_$dyn_memory_ptr",
															"nodeType": "YulIdentifier",
															"src": "5669:45:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "5669:78:22"
													},
													"variableNames": [
														{
															"name": "value0",
															"nodeType": "YulIdentifier",
															"src": "5659:6:22"
														}
													]
												}
											]
										}
									]
								},
								"name": "abi_decode_tuple_t_array$_t_uint256_$dyn_memory_ptr",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "5286:9:22",
										"type": ""
									},
									{
										"name": "dataEnd",
										"nodeType": "YulTypedName",
										"src": "5297:7:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "5309:6:22",
										"type": ""
									}
								],
								"src": "5225:539:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "5815:51:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "5825:35:22",
											"value": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "5854:5:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint160",
													"nodeType": "YulIdentifier",
													"src": "5836:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5836:24:22"
											},
											"variableNames": [
												{
													"name": "cleaned",
													"nodeType": "YulIdentifier",
													"src": "5825:7:22"
												}
											]
										}
									]
								},
								"name": "cleanup_t_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "5797:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "cleaned",
										"nodeType": "YulTypedName",
										"src": "5807:7:22",
										"type": ""
									}
								],
								"src": "5770:96:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "5915:79:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "5972:16:22",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "5981:1:22",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "5984:1:22",
																	"type": "",
																	"value": "0"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "5974:6:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "5974:12:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "5974:12:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "5938:5:22"
															},
															{
																"arguments": [
																	{
																		"name": "value",
																		"nodeType": "YulIdentifier",
																		"src": "5963:5:22"
																	}
																],
																"functionName": {
																	"name": "cleanup_t_address",
																	"nodeType": "YulIdentifier",
																	"src": "5945:17:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "5945:24:22"
															}
														],
														"functionName": {
															"name": "eq",
															"nodeType": "YulIdentifier",
															"src": "5935:2:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "5935:35:22"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "5928:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5928:43:22"
											},
											"nodeType": "YulIf",
											"src": "5925:63:22"
										}
									]
								},
								"name": "validator_revert_t_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "5908:5:22",
										"type": ""
									}
								],
								"src": "5872:122:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "6052:87:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "6062:29:22",
											"value": {
												"arguments": [
													{
														"name": "offset",
														"nodeType": "YulIdentifier",
														"src": "6084:6:22"
													}
												],
												"functionName": {
													"name": "calldataload",
													"nodeType": "YulIdentifier",
													"src": "6071:12:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6071:20:22"
											},
											"variableNames": [
												{
													"name": "value",
													"nodeType": "YulIdentifier",
													"src": "6062:5:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "6127:5:22"
													}
												],
												"functionName": {
													"name": "validator_revert_t_address",
													"nodeType": "YulIdentifier",
													"src": "6100:26:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6100:33:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "6100:33:22"
										}
									]
								},
								"name": "abi_decode_t_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "offset",
										"nodeType": "YulTypedName",
										"src": "6030:6:22",
										"type": ""
									},
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "6038:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "6046:5:22",
										"type": ""
									}
								],
								"src": "6000:139:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "6211:263:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "6257:83:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
																"nodeType": "YulIdentifier",
																"src": "6259:77:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "6259:79:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "6259:79:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "6232:7:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "6241:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "6228:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "6228:23:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6253:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "slt",
													"nodeType": "YulIdentifier",
													"src": "6224:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6224:32:22"
											},
											"nodeType": "YulIf",
											"src": "6221:119:22"
										},
										{
											"nodeType": "YulBlock",
											"src": "6350:117:22",
											"statements": [
												{
													"nodeType": "YulVariableDeclaration",
													"src": "6365:15:22",
													"value": {
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6379:1:22",
														"type": "",
														"value": "0"
													},
													"variables": [
														{
															"name": "offset",
															"nodeType": "YulTypedName",
															"src": "6369:6:22",
															"type": ""
														}
													]
												},
												{
													"nodeType": "YulAssignment",
													"src": "6394:63:22",
													"value": {
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "headStart",
																		"nodeType": "YulIdentifier",
																		"src": "6429:9:22"
																	},
																	{
																		"name": "offset",
																		"nodeType": "YulIdentifier",
																		"src": "6440:6:22"
																	}
																],
																"functionName": {
																	"name": "add",
																	"nodeType": "YulIdentifier",
																	"src": "6425:3:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "6425:22:22"
															},
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "6449:7:22"
															}
														],
														"functionName": {
															"name": "abi_decode_t_address",
															"nodeType": "YulIdentifier",
															"src": "6404:20:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "6404:53:22"
													},
													"variableNames": [
														{
															"name": "value0",
															"nodeType": "YulIdentifier",
															"src": "6394:6:22"
														}
													]
												}
											]
										}
									]
								},
								"name": "abi_decode_tuple_t_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "6181:9:22",
										"type": ""
									},
									{
										"name": "dataEnd",
										"nodeType": "YulTypedName",
										"src": "6192:7:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "6204:6:22",
										"type": ""
									}
								],
								"src": "6145:329:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "6545:53:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "6562:3:22"
													},
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "6585:5:22"
															}
														],
														"functionName": {
															"name": "cleanup_t_address",
															"nodeType": "YulIdentifier",
															"src": "6567:17:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "6567:24:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "6555:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6555:37:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "6555:37:22"
										}
									]
								},
								"name": "abi_encode_t_address_to_t_address_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "6533:5:22",
										"type": ""
									},
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "6540:3:22",
										"type": ""
									}
								],
								"src": "6480:118:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "6702:124:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "6712:26:22",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "6724:9:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6735:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "6720:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6720:18:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "6712:4:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "value0",
														"nodeType": "YulIdentifier",
														"src": "6792:6:22"
													},
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "6805:9:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "6816:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "6801:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "6801:17:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_address_to_t_address_fromStack",
													"nodeType": "YulIdentifier",
													"src": "6748:43:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6748:71:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "6748:71:22"
										}
									]
								},
								"name": "abi_encode_tuple_t_address__to_t_address__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "6674:9:22",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "6686:6:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "6697:4:22",
										"type": ""
									}
								],
								"src": "6604:222:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "6860:152:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6877:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6880:77:22",
														"type": "",
														"value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "6870:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6870:88:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "6870:88:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6974:1:22",
														"type": "",
														"value": "4"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6977:4:22",
														"type": "",
														"value": "0x32"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "6967:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6967:15:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "6967:15:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6998:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "7001:4:22",
														"type": "",
														"value": "0x24"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "6991:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6991:15:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "6991:15:22"
										}
									]
								},
								"name": "panic_error_0x32",
								"nodeType": "YulFunctionDefinition",
								"src": "6832:180:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "7081:80:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "7091:22:22",
											"value": {
												"arguments": [
													{
														"name": "offset",
														"nodeType": "YulIdentifier",
														"src": "7106:6:22"
													}
												],
												"functionName": {
													"name": "mload",
													"nodeType": "YulIdentifier",
													"src": "7100:5:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "7100:13:22"
											},
											"variableNames": [
												{
													"name": "value",
													"nodeType": "YulIdentifier",
													"src": "7091:5:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "7149:5:22"
													}
												],
												"functionName": {
													"name": "validator_revert_t_address",
													"nodeType": "YulIdentifier",
													"src": "7122:26:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "7122:33:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "7122:33:22"
										}
									]
								},
								"name": "abi_decode_t_address_fromMemory",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "offset",
										"nodeType": "YulTypedName",
										"src": "7059:6:22",
										"type": ""
									},
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "7067:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "7075:5:22",
										"type": ""
									}
								],
								"src": "7018:143:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "7244:274:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "7290:83:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
																"nodeType": "YulIdentifier",
																"src": "7292:77:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "7292:79:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "7292:79:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "7265:7:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "7274:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "7261:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "7261:23:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "7286:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "slt",
													"nodeType": "YulIdentifier",
													"src": "7257:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "7257:32:22"
											},
											"nodeType": "YulIf",
											"src": "7254:119:22"
										},
										{
											"nodeType": "YulBlock",
											"src": "7383:128:22",
											"statements": [
												{
													"nodeType": "YulVariableDeclaration",
													"src": "7398:15:22",
													"value": {
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "7412:1:22",
														"type": "",
														"value": "0"
													},
													"variables": [
														{
															"name": "offset",
															"nodeType": "YulTypedName",
															"src": "7402:6:22",
															"type": ""
														}
													]
												},
												{
													"nodeType": "YulAssignment",
													"src": "7427:74:22",
													"value": {
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "headStart",
																		"nodeType": "YulIdentifier",
																		"src": "7473:9:22"
																	},
																	{
																		"name": "offset",
																		"nodeType": "YulIdentifier",
																		"src": "7484:6:22"
																	}
																],
																"functionName": {
																	"name": "add",
																	"nodeType": "YulIdentifier",
																	"src": "7469:3:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "7469:22:22"
															},
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "7493:7:22"
															}
														],
														"functionName": {
															"name": "abi_decode_t_address_fromMemory",
															"nodeType": "YulIdentifier",
															"src": "7437:31:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "7437:64:22"
													},
													"variableNames": [
														{
															"name": "value0",
															"nodeType": "YulIdentifier",
															"src": "7427:6:22"
														}
													]
												}
											]
										}
									]
								},
								"name": "abi_decode_tuple_t_address_fromMemory",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "7214:9:22",
										"type": ""
									},
									{
										"name": "dataEnd",
										"nodeType": "YulTypedName",
										"src": "7225:7:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "7237:6:22",
										"type": ""
									}
								],
								"src": "7167:351:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "7620:73:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "7637:3:22"
													},
													{
														"name": "length",
														"nodeType": "YulIdentifier",
														"src": "7642:6:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "7630:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "7630:19:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "7630:19:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "7658:29:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "7677:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "7682:4:22",
														"type": "",
														"value": "0x20"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "7673:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "7673:14:22"
											},
											"variableNames": [
												{
													"name": "updated_pos",
													"nodeType": "YulIdentifier",
													"src": "7658:11:22"
												}
											]
										}
									]
								},
								"name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "7592:3:22",
										"type": ""
									},
									{
										"name": "length",
										"nodeType": "YulTypedName",
										"src": "7597:6:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "updated_pos",
										"nodeType": "YulTypedName",
										"src": "7608:11:22",
										"type": ""
									}
								],
								"src": "7524:169:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "7805:128:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "memPtr",
																"nodeType": "YulIdentifier",
																"src": "7827:6:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "7835:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "7823:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "7823:14:22"
													},
													{
														"hexValue": "596f75206d75737420626520746865206f776e6572206f6620616e204e465420",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "7839:34:22",
														"type": "",
														"value": "You must be the owner of an NFT "
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "7816:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "7816:58:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "7816:58:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "memPtr",
																"nodeType": "YulIdentifier",
																"src": "7895:6:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "7903:2:22",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "7891:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "7891:15:22"
													},
													{
														"hexValue": "746f20636c61696d2066756e64732e",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "7908:17:22",
														"type": "",
														"value": "to claim funds."
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "7884:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "7884:42:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "7884:42:22"
										}
									]
								},
								"name": "store_literal_in_memory_9dfce18898f319dac950707b1f6cc7eb9f49bd986439db46948375872f7bd448",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "7797:6:22",
										"type": ""
									}
								],
								"src": "7699:234:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "8085:220:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "8095:74:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "8161:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "8166:2:22",
														"type": "",
														"value": "47"
													}
												],
												"functionName": {
													"name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "8102:58:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8102:67:22"
											},
											"variableNames": [
												{
													"name": "pos",
													"nodeType": "YulIdentifier",
													"src": "8095:3:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "8267:3:22"
													}
												],
												"functionName": {
													"name": "store_literal_in_memory_9dfce18898f319dac950707b1f6cc7eb9f49bd986439db46948375872f7bd448",
													"nodeType": "YulIdentifier",
													"src": "8178:88:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8178:93:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "8178:93:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "8280:19:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "8291:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "8296:2:22",
														"type": "",
														"value": "64"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "8287:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8287:12:22"
											},
											"variableNames": [
												{
													"name": "end",
													"nodeType": "YulIdentifier",
													"src": "8280:3:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_t_stringliteral_9dfce18898f319dac950707b1f6cc7eb9f49bd986439db46948375872f7bd448_to_t_string_memory_ptr_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "8073:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "8081:3:22",
										"type": ""
									}
								],
								"src": "7939:366:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "8482:248:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "8492:26:22",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "8504:9:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "8515:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "8500:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8500:18:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "8492:4:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "8539:9:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "8550:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "8535:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "8535:17:22"
													},
													{
														"arguments": [
															{
																"name": "tail",
																"nodeType": "YulIdentifier",
																"src": "8558:4:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "8564:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "8554:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "8554:20:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "8528:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8528:47:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "8528:47:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "8584:139:22",
											"value": {
												"arguments": [
													{
														"name": "tail",
														"nodeType": "YulIdentifier",
														"src": "8718:4:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_stringliteral_9dfce18898f319dac950707b1f6cc7eb9f49bd986439db46948375872f7bd448_to_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "8592:124:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8592:131:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "8584:4:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_stringliteral_9dfce18898f319dac950707b1f6cc7eb9f49bd986439db46948375872f7bd448__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "8462:9:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "8477:4:22",
										"type": ""
									}
								],
								"src": "8311:419:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "8781:149:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "8791:25:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "8814:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "8796:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8796:20:22"
											},
											"variableNames": [
												{
													"name": "x",
													"nodeType": "YulIdentifier",
													"src": "8791:1:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "8825:25:22",
											"value": {
												"arguments": [
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "8848:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "8830:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8830:20:22"
											},
											"variableNames": [
												{
													"name": "y",
													"nodeType": "YulIdentifier",
													"src": "8825:1:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "8859:17:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "8871:1:22"
													},
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "8874:1:22"
													}
												],
												"functionName": {
													"name": "sub",
													"nodeType": "YulIdentifier",
													"src": "8867:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8867:9:22"
											},
											"variableNames": [
												{
													"name": "diff",
													"nodeType": "YulIdentifier",
													"src": "8859:4:22"
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "8901:22:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x11",
																"nodeType": "YulIdentifier",
																"src": "8903:16:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "8903:18:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "8903:18:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "diff",
														"nodeType": "YulIdentifier",
														"src": "8892:4:22"
													},
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "8898:1:22"
													}
												],
												"functionName": {
													"name": "gt",
													"nodeType": "YulIdentifier",
													"src": "8889:2:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8889:11:22"
											},
											"nodeType": "YulIf",
											"src": "8886:37:22"
										}
									]
								},
								"name": "checked_sub_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "x",
										"nodeType": "YulTypedName",
										"src": "8767:1:22",
										"type": ""
									},
									{
										"name": "y",
										"nodeType": "YulTypedName",
										"src": "8770:1:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "diff",
										"nodeType": "YulTypedName",
										"src": "8776:4:22",
										"type": ""
									}
								],
								"src": "8736:194:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "8999:80:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "9009:22:22",
											"value": {
												"arguments": [
													{
														"name": "offset",
														"nodeType": "YulIdentifier",
														"src": "9024:6:22"
													}
												],
												"functionName": {
													"name": "mload",
													"nodeType": "YulIdentifier",
													"src": "9018:5:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9018:13:22"
											},
											"variableNames": [
												{
													"name": "value",
													"nodeType": "YulIdentifier",
													"src": "9009:5:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "9067:5:22"
													}
												],
												"functionName": {
													"name": "validator_revert_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "9040:26:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9040:33:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "9040:33:22"
										}
									]
								},
								"name": "abi_decode_t_uint256_fromMemory",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "offset",
										"nodeType": "YulTypedName",
										"src": "8977:6:22",
										"type": ""
									},
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "8985:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "8993:5:22",
										"type": ""
									}
								],
								"src": "8936:143:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "9162:274:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "9208:83:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
																"nodeType": "YulIdentifier",
																"src": "9210:77:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "9210:79:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "9210:79:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "9183:7:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "9192:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "9179:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "9179:23:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "9204:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "slt",
													"nodeType": "YulIdentifier",
													"src": "9175:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9175:32:22"
											},
											"nodeType": "YulIf",
											"src": "9172:119:22"
										},
										{
											"nodeType": "YulBlock",
											"src": "9301:128:22",
											"statements": [
												{
													"nodeType": "YulVariableDeclaration",
													"src": "9316:15:22",
													"value": {
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "9330:1:22",
														"type": "",
														"value": "0"
													},
													"variables": [
														{
															"name": "offset",
															"nodeType": "YulTypedName",
															"src": "9320:6:22",
															"type": ""
														}
													]
												},
												{
													"nodeType": "YulAssignment",
													"src": "9345:74:22",
													"value": {
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "headStart",
																		"nodeType": "YulIdentifier",
																		"src": "9391:9:22"
																	},
																	{
																		"name": "offset",
																		"nodeType": "YulIdentifier",
																		"src": "9402:6:22"
																	}
																],
																"functionName": {
																	"name": "add",
																	"nodeType": "YulIdentifier",
																	"src": "9387:3:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "9387:22:22"
															},
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "9411:7:22"
															}
														],
														"functionName": {
															"name": "abi_decode_t_uint256_fromMemory",
															"nodeType": "YulIdentifier",
															"src": "9355:31:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "9355:64:22"
													},
													"variableNames": [
														{
															"name": "value0",
															"nodeType": "YulIdentifier",
															"src": "9345:6:22"
														}
													]
												}
											]
										}
									]
								},
								"name": "abi_decode_tuple_t_uint256_fromMemory",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "9132:9:22",
										"type": ""
									},
									{
										"name": "dataEnd",
										"nodeType": "YulTypedName",
										"src": "9143:7:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "9155:6:22",
										"type": ""
									}
								],
								"src": "9085:351:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "9490:362:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "9500:25:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "9523:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "9505:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9505:20:22"
											},
											"variableNames": [
												{
													"name": "x",
													"nodeType": "YulIdentifier",
													"src": "9500:1:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "9534:25:22",
											"value": {
												"arguments": [
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "9557:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "9539:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9539:20:22"
											},
											"variableNames": [
												{
													"name": "y",
													"nodeType": "YulIdentifier",
													"src": "9534:1:22"
												}
											]
										},
										{
											"nodeType": "YulVariableDeclaration",
											"src": "9568:28:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "9591:1:22"
													},
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "9594:1:22"
													}
												],
												"functionName": {
													"name": "mul",
													"nodeType": "YulIdentifier",
													"src": "9587:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9587:9:22"
											},
											"variables": [
												{
													"name": "product_raw",
													"nodeType": "YulTypedName",
													"src": "9572:11:22",
													"type": ""
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "9605:41:22",
											"value": {
												"arguments": [
													{
														"name": "product_raw",
														"nodeType": "YulIdentifier",
														"src": "9634:11:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "9616:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9616:30:22"
											},
											"variableNames": [
												{
													"name": "product",
													"nodeType": "YulIdentifier",
													"src": "9605:7:22"
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "9823:22:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x11",
																"nodeType": "YulIdentifier",
																"src": "9825:16:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "9825:18:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "9825:18:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "x",
																		"nodeType": "YulIdentifier",
																		"src": "9756:1:22"
																	}
																],
																"functionName": {
																	"name": "iszero",
																	"nodeType": "YulIdentifier",
																	"src": "9749:6:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "9749:9:22"
															},
															{
																"arguments": [
																	{
																		"name": "y",
																		"nodeType": "YulIdentifier",
																		"src": "9779:1:22"
																	},
																	{
																		"arguments": [
																			{
																				"name": "product",
																				"nodeType": "YulIdentifier",
																				"src": "9786:7:22"
																			},
																			{
																				"name": "x",
																				"nodeType": "YulIdentifier",
																				"src": "9795:1:22"
																			}
																		],
																		"functionName": {
																			"name": "div",
																			"nodeType": "YulIdentifier",
																			"src": "9782:3:22"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "9782:15:22"
																	}
																],
																"functionName": {
																	"name": "eq",
																	"nodeType": "YulIdentifier",
																	"src": "9776:2:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "9776:22:22"
															}
														],
														"functionName": {
															"name": "or",
															"nodeType": "YulIdentifier",
															"src": "9729:2:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "9729:83:22"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "9709:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9709:113:22"
											},
											"nodeType": "YulIf",
											"src": "9706:139:22"
										}
									]
								},
								"name": "checked_mul_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "x",
										"nodeType": "YulTypedName",
										"src": "9473:1:22",
										"type": ""
									},
									{
										"name": "y",
										"nodeType": "YulTypedName",
										"src": "9476:1:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "product",
										"nodeType": "YulTypedName",
										"src": "9482:7:22",
										"type": ""
									}
								],
								"src": "9442:410:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "9886:152:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "9903:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "9906:77:22",
														"type": "",
														"value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "9896:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9896:88:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "9896:88:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "10000:1:22",
														"type": "",
														"value": "4"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "10003:4:22",
														"type": "",
														"value": "0x12"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "9993:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9993:15:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "9993:15:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "10024:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "10027:4:22",
														"type": "",
														"value": "0x24"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "10017:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "10017:15:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "10017:15:22"
										}
									]
								},
								"name": "panic_error_0x12",
								"nodeType": "YulFunctionDefinition",
								"src": "9858:180:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "10086:143:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "10096:25:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "10119:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "10101:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "10101:20:22"
											},
											"variableNames": [
												{
													"name": "x",
													"nodeType": "YulIdentifier",
													"src": "10096:1:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "10130:25:22",
											"value": {
												"arguments": [
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "10153:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "10135:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "10135:20:22"
											},
											"variableNames": [
												{
													"name": "y",
													"nodeType": "YulIdentifier",
													"src": "10130:1:22"
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "10177:22:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x12",
																"nodeType": "YulIdentifier",
																"src": "10179:16:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "10179:18:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "10179:18:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "10174:1:22"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "10167:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "10167:9:22"
											},
											"nodeType": "YulIf",
											"src": "10164:35:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "10209:14:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "10218:1:22"
													},
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "10221:1:22"
													}
												],
												"functionName": {
													"name": "div",
													"nodeType": "YulIdentifier",
													"src": "10214:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "10214:9:22"
											},
											"variableNames": [
												{
													"name": "r",
													"nodeType": "YulIdentifier",
													"src": "10209:1:22"
												}
											]
										}
									]
								},
								"name": "checked_div_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "x",
										"nodeType": "YulTypedName",
										"src": "10075:1:22",
										"type": ""
									},
									{
										"name": "y",
										"nodeType": "YulTypedName",
										"src": "10078:1:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "r",
										"nodeType": "YulTypedName",
										"src": "10084:1:22",
										"type": ""
									}
								],
								"src": "10044:185:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "10278:190:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "10288:33:22",
											"value": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "10315:5:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "10297:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "10297:24:22"
											},
											"variableNames": [
												{
													"name": "value",
													"nodeType": "YulIdentifier",
													"src": "10288:5:22"
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "10411:22:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x11",
																"nodeType": "YulIdentifier",
																"src": "10413:16:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "10413:18:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "10413:18:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "10336:5:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "10343:66:22",
														"type": "",
														"value": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
													}
												],
												"functionName": {
													"name": "eq",
													"nodeType": "YulIdentifier",
													"src": "10333:2:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "10333:77:22"
											},
											"nodeType": "YulIf",
											"src": "10330:103:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "10442:20:22",
											"value": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "10453:5:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "10460:1:22",
														"type": "",
														"value": "1"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "10449:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "10449:13:22"
											},
											"variableNames": [
												{
													"name": "ret",
													"nodeType": "YulIdentifier",
													"src": "10442:3:22"
												}
											]
										}
									]
								},
								"name": "increment_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "10264:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "ret",
										"nodeType": "YulTypedName",
										"src": "10274:3:22",
										"type": ""
									}
								],
								"src": "10235:233:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "10580:61:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "memPtr",
																"nodeType": "YulIdentifier",
																"src": "10602:6:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "10610:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "10598:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "10598:14:22"
													},
													{
														"hexValue": "4e6f2066756e647320746f20636c61696d",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "10614:19:22",
														"type": "",
														"value": "No funds to claim"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "10591:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "10591:43:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "10591:43:22"
										}
									]
								},
								"name": "store_literal_in_memory_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "10572:6:22",
										"type": ""
									}
								],
								"src": "10474:167:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "10793:220:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "10803:74:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "10869:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "10874:2:22",
														"type": "",
														"value": "17"
													}
												],
												"functionName": {
													"name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "10810:58:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "10810:67:22"
											},
											"variableNames": [
												{
													"name": "pos",
													"nodeType": "YulIdentifier",
													"src": "10803:3:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "10975:3:22"
													}
												],
												"functionName": {
													"name": "store_literal_in_memory_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d",
													"nodeType": "YulIdentifier",
													"src": "10886:88:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "10886:93:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "10886:93:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "10988:19:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "10999:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "11004:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "10995:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "10995:12:22"
											},
											"variableNames": [
												{
													"name": "end",
													"nodeType": "YulIdentifier",
													"src": "10988:3:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d_to_t_string_memory_ptr_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "10781:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "10789:3:22",
										"type": ""
									}
								],
								"src": "10647:366:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "11190:248:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "11200:26:22",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "11212:9:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "11223:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "11208:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "11208:18:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "11200:4:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "11247:9:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "11258:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "11243:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "11243:17:22"
													},
													{
														"arguments": [
															{
																"name": "tail",
																"nodeType": "YulIdentifier",
																"src": "11266:4:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "11272:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "11262:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "11262:20:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "11236:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "11236:47:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "11236:47:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "11292:139:22",
											"value": {
												"arguments": [
													{
														"name": "tail",
														"nodeType": "YulIdentifier",
														"src": "11426:4:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d_to_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "11300:124:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "11300:131:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "11292:4:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "11170:9:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "11185:4:22",
										"type": ""
									}
								],
								"src": "11019:419:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "11557:34:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "11567:18:22",
											"value": {
												"name": "pos",
												"nodeType": "YulIdentifier",
												"src": "11582:3:22"
											},
											"variableNames": [
												{
													"name": "updated_pos",
													"nodeType": "YulIdentifier",
													"src": "11567:11:22"
												}
											]
										}
									]
								},
								"name": "array_storeLengthForEncoding_t_bytes_memory_ptr_nonPadded_inplace_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "11529:3:22",
										"type": ""
									},
									{
										"name": "length",
										"nodeType": "YulTypedName",
										"src": "11534:6:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "updated_pos",
										"nodeType": "YulTypedName",
										"src": "11545:11:22",
										"type": ""
									}
								],
								"src": "11444:147:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "11703:8:22",
									"statements": []
								},
								"name": "store_literal_in_memory_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "11695:6:22",
										"type": ""
									}
								],
								"src": "11597:114:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "11880:235:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "11890:90:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "11973:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "11978:1:22",
														"type": "",
														"value": "0"
													}
												],
												"functionName": {
													"name": "array_storeLengthForEncoding_t_bytes_memory_ptr_nonPadded_inplace_fromStack",
													"nodeType": "YulIdentifier",
													"src": "11897:75:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "11897:83:22"
											},
											"variableNames": [
												{
													"name": "pos",
													"nodeType": "YulIdentifier",
													"src": "11890:3:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "12078:3:22"
													}
												],
												"functionName": {
													"name": "store_literal_in_memory_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
													"nodeType": "YulIdentifier",
													"src": "11989:88:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "11989:93:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "11989:93:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "12091:18:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "12102:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "12107:1:22",
														"type": "",
														"value": "0"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "12098:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "12098:11:22"
											},
											"variableNames": [
												{
													"name": "end",
													"nodeType": "YulIdentifier",
													"src": "12091:3:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470_to_t_bytes_memory_ptr_nonPadded_inplace_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "11868:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "11876:3:22",
										"type": ""
									}
								],
								"src": "11717:398:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "12309:191:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "12320:154:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "12470:3:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470_to_t_bytes_memory_ptr_nonPadded_inplace_fromStack",
													"nodeType": "YulIdentifier",
													"src": "12327:141:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "12327:147:22"
											},
											"variableNames": [
												{
													"name": "pos",
													"nodeType": "YulIdentifier",
													"src": "12320:3:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "12484:10:22",
											"value": {
												"name": "pos",
												"nodeType": "YulIdentifier",
												"src": "12491:3:22"
											},
											"variableNames": [
												{
													"name": "end",
													"nodeType": "YulIdentifier",
													"src": "12484:3:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "12296:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "12305:3:22",
										"type": ""
									}
								],
								"src": "12121:379:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "12612:46:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "memPtr",
																"nodeType": "YulIdentifier",
																"src": "12634:6:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "12642:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "12630:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "12630:14:22"
													},
													{
														"hexValue": "6e6f",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "12646:4:22",
														"type": "",
														"value": "no"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "12623:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "12623:28:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "12623:28:22"
										}
									]
								},
								"name": "store_literal_in_memory_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "12604:6:22",
										"type": ""
									}
								],
								"src": "12506:152:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "12810:219:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "12820:73:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "12886:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "12891:1:22",
														"type": "",
														"value": "2"
													}
												],
												"functionName": {
													"name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "12827:58:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "12827:66:22"
											},
											"variableNames": [
												{
													"name": "pos",
													"nodeType": "YulIdentifier",
													"src": "12820:3:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "12991:3:22"
													}
												],
												"functionName": {
													"name": "store_literal_in_memory_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba",
													"nodeType": "YulIdentifier",
													"src": "12902:88:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "12902:93:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "12902:93:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "13004:19:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "13015:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "13020:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "13011:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "13011:12:22"
											},
											"variableNames": [
												{
													"name": "end",
													"nodeType": "YulIdentifier",
													"src": "13004:3:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba_to_t_string_memory_ptr_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "12798:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "12806:3:22",
										"type": ""
									}
								],
								"src": "12664:365:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "13206:248:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "13216:26:22",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "13228:9:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "13239:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "13224:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "13224:18:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "13216:4:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "13263:9:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "13274:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "13259:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "13259:17:22"
													},
													{
														"arguments": [
															{
																"name": "tail",
																"nodeType": "YulIdentifier",
																"src": "13282:4:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "13288:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "13278:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "13278:20:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "13252:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "13252:47:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "13252:47:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "13308:139:22",
											"value": {
												"arguments": [
													{
														"name": "tail",
														"nodeType": "YulIdentifier",
														"src": "13442:4:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba_to_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "13316:124:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "13316:131:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "13308:4:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "13186:9:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "13201:4:22",
										"type": ""
									}
								],
								"src": "13035:419:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "13566:76:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "memPtr",
																"nodeType": "YulIdentifier",
																"src": "13588:6:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "13596:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "13584:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "13584:14:22"
													},
													{
														"hexValue": "4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "13600:34:22",
														"type": "",
														"value": "Ownable: caller is not the owner"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "13577:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "13577:58:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "13577:58:22"
										}
									]
								},
								"name": "store_literal_in_memory_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "13558:6:22",
										"type": ""
									}
								],
								"src": "13460:182:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "13794:220:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "13804:74:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "13870:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "13875:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "13811:58:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "13811:67:22"
											},
											"variableNames": [
												{
													"name": "pos",
													"nodeType": "YulIdentifier",
													"src": "13804:3:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "13976:3:22"
													}
												],
												"functionName": {
													"name": "store_literal_in_memory_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe",
													"nodeType": "YulIdentifier",
													"src": "13887:88:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "13887:93:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "13887:93:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "13989:19:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "14000:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "14005:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "13996:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "13996:12:22"
											},
											"variableNames": [
												{
													"name": "end",
													"nodeType": "YulIdentifier",
													"src": "13989:3:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe_to_t_string_memory_ptr_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "13782:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "13790:3:22",
										"type": ""
									}
								],
								"src": "13648:366:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "14191:248:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "14201:26:22",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "14213:9:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "14224:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "14209:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "14209:18:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "14201:4:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "14248:9:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "14259:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "14244:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "14244:17:22"
													},
													{
														"arguments": [
															{
																"name": "tail",
																"nodeType": "YulIdentifier",
																"src": "14267:4:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "14273:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "14263:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "14263:20:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "14237:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "14237:47:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "14237:47:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "14293:139:22",
											"value": {
												"arguments": [
													{
														"name": "tail",
														"nodeType": "YulIdentifier",
														"src": "14427:4:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe_to_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "14301:124:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "14301:131:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "14293:4:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "14171:9:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "14186:4:22",
										"type": ""
									}
								],
								"src": "14020:419:22"
							}
						]
					},
					"contents": "{\n\n    function cleanup_t_uint256(value) -> cleaned {\n        cleaned := value\n    }\n\n    function panic_error_0x11() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x11)\n        revert(0, 0x24)\n    }\n\n    function checked_add_t_uint256(x, y) -> sum {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n        sum := add(x, y)\n\n        if gt(x, sum) { panic_error_0x11() }\n\n    }\n\n    function allocate_unbounded() -> memPtr {\n        memPtr := mload(64)\n    }\n\n    function revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() {\n        revert(0, 0)\n    }\n\n    function revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() {\n        revert(0, 0)\n    }\n\n    function validator_revert_t_uint256(value) {\n        if iszero(eq(value, cleanup_t_uint256(value))) { revert(0, 0) }\n    }\n\n    function abi_decode_t_uint256(offset, end) -> value {\n        value := calldataload(offset)\n        validator_revert_t_uint256(value)\n    }\n\n    function abi_decode_tuple_t_uint256(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_encode_t_uint256_to_t_uint256_fromStack(value, pos) {\n        mstore(pos, cleanup_t_uint256(value))\n    }\n\n    function abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function cleanup_t_uint160(value) -> cleaned {\n        cleaned := and(value, 0xffffffffffffffffffffffffffffffffffffffff)\n    }\n\n    function identity(value) -> ret {\n        ret := value\n    }\n\n    function convert_t_uint160_to_t_uint160(value) -> converted {\n        converted := cleanup_t_uint160(identity(cleanup_t_uint160(value)))\n    }\n\n    function convert_t_uint160_to_t_address(value) -> converted {\n        converted := convert_t_uint160_to_t_uint160(value)\n    }\n\n    function convert_t_contract$_GameItem_$4024_to_t_address(value) -> converted {\n        converted := convert_t_uint160_to_t_address(value)\n    }\n\n    function abi_encode_t_contract$_GameItem_$4024_to_t_address_fromStack(value, pos) {\n        mstore(pos, convert_t_contract$_GameItem_$4024_to_t_address(value))\n    }\n\n    function abi_encode_tuple_t_contract$_GameItem_$4024__to_t_address__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_contract$_GameItem_$4024_to_t_address_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d() {\n        revert(0, 0)\n    }\n\n    function round_up_to_mul_of_32(value) -> result {\n        result := and(add(value, 31), not(31))\n    }\n\n    function panic_error_0x41() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x41)\n        revert(0, 0x24)\n    }\n\n    function finalize_allocation(memPtr, size) {\n        let newFreePtr := add(memPtr, round_up_to_mul_of_32(size))\n        // protect against overflow\n        if or(gt(newFreePtr, 0xffffffffffffffff), lt(newFreePtr, memPtr)) { panic_error_0x41() }\n        mstore(64, newFreePtr)\n    }\n\n    function allocate_memory(size) -> memPtr {\n        memPtr := allocate_unbounded()\n        finalize_allocation(memPtr, size)\n    }\n\n    function array_allocation_size_t_array$_t_uint256_$dyn_memory_ptr(length) -> size {\n        // Make sure we can allocate memory without overflow\n        if gt(length, 0xffffffffffffffff) { panic_error_0x41() }\n\n        size := mul(length, 0x20)\n\n        // add length slot\n        size := add(size, 0x20)\n\n    }\n\n    function revert_error_81385d8c0b31fffe14be1da910c8bd3a80be4cfa248e04f42ec0faea3132a8ef() {\n        revert(0, 0)\n    }\n\n    // uint256[]\n    function abi_decode_available_length_t_array$_t_uint256_$dyn_memory_ptr(offset, length, end) -> array {\n        array := allocate_memory(array_allocation_size_t_array$_t_uint256_$dyn_memory_ptr(length))\n        let dst := array\n\n        mstore(array, length)\n        dst := add(array, 0x20)\n\n        let srcEnd := add(offset, mul(length, 0x20))\n        if gt(srcEnd, end) {\n            revert_error_81385d8c0b31fffe14be1da910c8bd3a80be4cfa248e04f42ec0faea3132a8ef()\n        }\n        for { let src := offset } lt(src, srcEnd) { src := add(src, 0x20) }\n        {\n\n            let elementPos := src\n\n            mstore(dst, abi_decode_t_uint256(elementPos, end))\n            dst := add(dst, 0x20)\n        }\n    }\n\n    // uint256[]\n    function abi_decode_t_array$_t_uint256_$dyn_memory_ptr(offset, end) -> array {\n        if iszero(slt(add(offset, 0x1f), end)) { revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d() }\n        let length := calldataload(offset)\n        array := abi_decode_available_length_t_array$_t_uint256_$dyn_memory_ptr(add(offset, 0x20), length, end)\n    }\n\n    function abi_decode_tuple_t_array$_t_uint256_$dyn_memory_ptr(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := calldataload(add(headStart, 0))\n            if gt(offset, 0xffffffffffffffff) { revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() }\n\n            value0 := abi_decode_t_array$_t_uint256_$dyn_memory_ptr(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function cleanup_t_address(value) -> cleaned {\n        cleaned := cleanup_t_uint160(value)\n    }\n\n    function validator_revert_t_address(value) {\n        if iszero(eq(value, cleanup_t_address(value))) { revert(0, 0) }\n    }\n\n    function abi_decode_t_address(offset, end) -> value {\n        value := calldataload(offset)\n        validator_revert_t_address(value)\n    }\n\n    function abi_decode_tuple_t_address(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_encode_t_address_to_t_address_fromStack(value, pos) {\n        mstore(pos, cleanup_t_address(value))\n    }\n\n    function abi_encode_tuple_t_address__to_t_address__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_address_to_t_address_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function panic_error_0x32() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x32)\n        revert(0, 0x24)\n    }\n\n    function abi_decode_t_address_fromMemory(offset, end) -> value {\n        value := mload(offset)\n        validator_revert_t_address(value)\n    }\n\n    function abi_decode_tuple_t_address_fromMemory(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length) -> updated_pos {\n        mstore(pos, length)\n        updated_pos := add(pos, 0x20)\n    }\n\n    function store_literal_in_memory_9dfce18898f319dac950707b1f6cc7eb9f49bd986439db46948375872f7bd448(memPtr) {\n\n        mstore(add(memPtr, 0), \"You must be the owner of an NFT \")\n\n        mstore(add(memPtr, 32), \"to claim funds.\")\n\n    }\n\n    function abi_encode_t_stringliteral_9dfce18898f319dac950707b1f6cc7eb9f49bd986439db46948375872f7bd448_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 47)\n        store_literal_in_memory_9dfce18898f319dac950707b1f6cc7eb9f49bd986439db46948375872f7bd448(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_9dfce18898f319dac950707b1f6cc7eb9f49bd986439db46948375872f7bd448__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_9dfce18898f319dac950707b1f6cc7eb9f49bd986439db46948375872f7bd448_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function checked_sub_t_uint256(x, y) -> diff {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n        diff := sub(x, y)\n\n        if gt(diff, x) { panic_error_0x11() }\n\n    }\n\n    function abi_decode_t_uint256_fromMemory(offset, end) -> value {\n        value := mload(offset)\n        validator_revert_t_uint256(value)\n    }\n\n    function abi_decode_tuple_t_uint256_fromMemory(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_uint256_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function checked_mul_t_uint256(x, y) -> product {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n        let product_raw := mul(x, y)\n        product := cleanup_t_uint256(product_raw)\n\n        // overflow, if x != 0 and y != product/x\n        if iszero(\n            or(\n                iszero(x),\n                eq(y, div(product, x))\n            )\n        ) { panic_error_0x11() }\n\n    }\n\n    function panic_error_0x12() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x12)\n        revert(0, 0x24)\n    }\n\n    function checked_div_t_uint256(x, y) -> r {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n        if iszero(y) { panic_error_0x12() }\n\n        r := div(x, y)\n    }\n\n    function increment_t_uint256(value) -> ret {\n        value := cleanup_t_uint256(value)\n        if eq(value, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff) { panic_error_0x11() }\n        ret := add(value, 1)\n    }\n\n    function store_literal_in_memory_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d(memPtr) {\n\n        mstore(add(memPtr, 0), \"No funds to claim\")\n\n    }\n\n    function abi_encode_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 17)\n        store_literal_in_memory_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d(pos)\n        end := add(pos, 32)\n    }\n\n    function abi_encode_tuple_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function array_storeLengthForEncoding_t_bytes_memory_ptr_nonPadded_inplace_fromStack(pos, length) -> updated_pos {\n        updated_pos := pos\n    }\n\n    function store_literal_in_memory_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470(memPtr) {\n\n    }\n\n    function abi_encode_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470_to_t_bytes_memory_ptr_nonPadded_inplace_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_bytes_memory_ptr_nonPadded_inplace_fromStack(pos, 0)\n        store_literal_in_memory_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470(pos)\n        end := add(pos, 0)\n    }\n\n    function abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed(pos ) -> end {\n\n        pos := abi_encode_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470_to_t_bytes_memory_ptr_nonPadded_inplace_fromStack( pos)\n\n        end := pos\n    }\n\n    function store_literal_in_memory_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba(memPtr) {\n\n        mstore(add(memPtr, 0), \"no\")\n\n    }\n\n    function abi_encode_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 2)\n        store_literal_in_memory_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba(pos)\n        end := add(pos, 32)\n    }\n\n    function abi_encode_tuple_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe(memPtr) {\n\n        mstore(add(memPtr, 0), \"Ownable: caller is not the owner\")\n\n    }\n\n    function abi_encode_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 32)\n        store_literal_in_memory_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe(pos)\n        end := add(pos, 32)\n    }\n\n    function abi_encode_tuple_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n}\n",
					"id": 22,
					"language": "Yul",
					"name": "#utility.yul"
				}
			],
			"immutableReferences": {},
			"linkReferences": {},
			"object": "6080604052600436106100c65760003560e01c80638da5cb5b1161007f578063bf8ebd8511610059578063bf8ebd851461028d578063d0e30db0146102ca578063eb8bbd28146102d4578063f2fde38b146102ff576100e5565b80638da5cb5b146101fa578063968ed60014610225578063a888c2cd14610250576100e5565b80632c110641146100ea57806341c613831461012757806347ccca02146101525780636ba4c1381461017d5780636f8b65a4146101a6578063715018a6146101e3576100e5565b366100e55734600260008282546100dd9190610a78565b925050819055005b600080fd5b3480156100f657600080fd5b50610111600480360381019061010c9190610aec565b610328565b60405161011e9190610b28565b60405180910390f35b34801561013357600080fd5b5061013c610340565b6040516101499190610b28565b60405180910390f35b34801561015e57600080fd5b50610167610346565b6040516101749190610bc2565b60405180910390f35b34801561018957600080fd5b506101a4600480360381019061019f9190610d36565b61036c565b005b3480156101b257600080fd5b506101cd60048036038101906101c89190610dbd565b61072a565b6040516101da9190610b28565b60405180910390f35b3480156101ef57600080fd5b506101f8610742565b005b34801561020657600080fd5b5061020f610756565b60405161021c9190610df9565b60405180910390f35b34801561023157600080fd5b5061023a61077f565b6040516102479190610b28565b60405180910390f35b34801561025c57600080fd5b5061027760048036038101906102729190610aec565b610785565b6040516102849190610b28565b60405180910390f35b34801561029957600080fd5b506102b460048036038101906102af9190610dbd565b61079d565b6040516102c19190610b28565b60405180910390f35b6102d2610842565b005b3480156102e057600080fd5b506102e961085d565b6040516102f69190610b28565b60405180910390f35b34801561030b57600080fd5b5061032660048036038101906103219190610dbd565b610867565b005b60056020528060005260406000206000915090505481565b60035481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600190505b8251811161063057600083828151811061039157610390610e14565b5b602002602001015190503373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636352211e836040518263ffffffff1660e01b815260040161040d9190610b28565b602060405180830381865afa15801561042a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061044e9190610e58565b73ffffffffffffffffffffffffffffffffffffffff16146104a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049b90610f08565b60405180910390fd5b600060056000838152602001908152602001600020546002546104c79190610f28565b111561061c57683635c9adc5dea00000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610544573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105689190610f71565b683635c9adc5dea0000060056000858152602001908152602001600020546002546105939190610f28565b61059d9190610f9e565b6105a7919061100f565b6105b19190610f9e565b836105bc9190610a78565b9250826006600083815260200190815260200160002060008282546105e19190610a78565b92505081905550600254600560008381526020019081526020016000208190555082600360008282546106149190610a78565b925050819055505b50808061062890611040565b915050610374565b5060008111610674576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066b906110d4565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff1681615e4a9060405161069c90611125565b600060405180830381858888f193505050503d80600081146106da576040519150601f19603f3d011682016040523d82523d6000602084013e6106df565b606091505b50505042600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050565b60046020528060005260406000206000915090505481565b61074a6108f5565b6107546000610973565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60025481565b60066020528060005260406000206000915090505481565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231836040518263ffffffff1660e01b81526004016107fa9190610df9565b602060405180830381865afa158015610817573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061083b9190610f71565b9050919050565b34600260008282546108549190610a78565b92505081905550565b6000600254905090565b73791f1cfb231e7c75eee4b7f8913e3c2b3548eb9373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108e090611186565b60405180910390fd5b6108f281610973565b50565b6108fd610a37565b73ffffffffffffffffffffffffffffffffffffffff1661091b610756565b73ffffffffffffffffffffffffffffffffffffffff1614610971576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610968906111f2565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610a8382610a3f565b9150610a8e83610a3f565b9250828201905080821115610aa657610aa5610a49565b5b92915050565b6000604051905090565b600080fd5b600080fd5b610ac981610a3f565b8114610ad457600080fd5b50565b600081359050610ae681610ac0565b92915050565b600060208284031215610b0257610b01610ab6565b5b6000610b1084828501610ad7565b91505092915050565b610b2281610a3f565b82525050565b6000602082019050610b3d6000830184610b19565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000610b88610b83610b7e84610b43565b610b63565b610b43565b9050919050565b6000610b9a82610b6d565b9050919050565b6000610bac82610b8f565b9050919050565b610bbc81610ba1565b82525050565b6000602082019050610bd76000830184610bb3565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610c2b82610be2565b810181811067ffffffffffffffff82111715610c4a57610c49610bf3565b5b80604052505050565b6000610c5d610aac565b9050610c698282610c22565b919050565b600067ffffffffffffffff821115610c8957610c88610bf3565b5b602082029050602081019050919050565b600080fd5b6000610cb2610cad84610c6e565b610c53565b90508083825260208201905060208402830185811115610cd557610cd4610c9a565b5b835b81811015610cfe5780610cea8882610ad7565b845260208401935050602081019050610cd7565b5050509392505050565b600082601f830112610d1d57610d1c610bdd565b5b8135610d2d848260208601610c9f565b91505092915050565b600060208284031215610d4c57610d4b610ab6565b5b600082013567ffffffffffffffff811115610d6a57610d69610abb565b5b610d7684828501610d08565b91505092915050565b6000610d8a82610b43565b9050919050565b610d9a81610d7f565b8114610da557600080fd5b50565b600081359050610db781610d91565b92915050565b600060208284031215610dd357610dd2610ab6565b5b6000610de184828501610da8565b91505092915050565b610df381610d7f565b82525050565b6000602082019050610e0e6000830184610dea565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600081519050610e5281610d91565b92915050565b600060208284031215610e6e57610e6d610ab6565b5b6000610e7c84828501610e43565b91505092915050565b600082825260208201905092915050565b7f596f75206d75737420626520746865206f776e6572206f6620616e204e46542060008201527f746f20636c61696d2066756e64732e0000000000000000000000000000000000602082015250565b6000610ef2602f83610e85565b9150610efd82610e96565b604082019050919050565b60006020820190508181036000830152610f2181610ee5565b9050919050565b6000610f3382610a3f565b9150610f3e83610a3f565b9250828203905081811115610f5657610f55610a49565b5b92915050565b600081519050610f6b81610ac0565b92915050565b600060208284031215610f8757610f86610ab6565b5b6000610f9584828501610f5c565b91505092915050565b6000610fa982610a3f565b9150610fb483610a3f565b9250828202610fc281610a3f565b91508282048414831517610fd957610fd8610a49565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061101a82610a3f565b915061102583610a3f565b92508261103557611034610fe0565b5b828204905092915050565b600061104b82610a3f565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361107d5761107c610a49565b5b600182019050919050565b7f4e6f2066756e647320746f20636c61696d000000000000000000000000000000600082015250565b60006110be601183610e85565b91506110c982611088565b602082019050919050565b600060208201905081810360008301526110ed816110b1565b9050919050565b600081905092915050565b50565b600061110f6000836110f4565b915061111a826110ff565b600082019050919050565b600061113082611102565b9150819050919050565b7f6e6f000000000000000000000000000000000000000000000000000000000000600082015250565b6000611170600283610e85565b915061117b8261113a565b602082019050919050565b6000602082019050818103600083015261119f81611163565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006111dc602083610e85565b91506111e7826111a6565b602082019050919050565b6000602082019050818103600083015261120b816111cf565b905091905056fea2646970667358221220edbb22cf209edd5ae1e07d2888d426eba9d34f104c1cf4c08a40eb282c0ca65f64736f6c63430008110033",
			"opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0xC6 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x8DA5CB5B GT PUSH2 0x7F JUMPI DUP1 PUSH4 0xBF8EBD85 GT PUSH2 0x59 JUMPI DUP1 PUSH4 0xBF8EBD85 EQ PUSH2 0x28D JUMPI DUP1 PUSH4 0xD0E30DB0 EQ PUSH2 0x2CA JUMPI DUP1 PUSH4 0xEB8BBD28 EQ PUSH2 0x2D4 JUMPI DUP1 PUSH4 0xF2FDE38B EQ PUSH2 0x2FF JUMPI PUSH2 0xE5 JUMP JUMPDEST DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0x1FA JUMPI DUP1 PUSH4 0x968ED600 EQ PUSH2 0x225 JUMPI DUP1 PUSH4 0xA888C2CD EQ PUSH2 0x250 JUMPI PUSH2 0xE5 JUMP JUMPDEST DUP1 PUSH4 0x2C110641 EQ PUSH2 0xEA JUMPI DUP1 PUSH4 0x41C61383 EQ PUSH2 0x127 JUMPI DUP1 PUSH4 0x47CCCA02 EQ PUSH2 0x152 JUMPI DUP1 PUSH4 0x6BA4C138 EQ PUSH2 0x17D JUMPI DUP1 PUSH4 0x6F8B65A4 EQ PUSH2 0x1A6 JUMPI DUP1 PUSH4 0x715018A6 EQ PUSH2 0x1E3 JUMPI PUSH2 0xE5 JUMP JUMPDEST CALLDATASIZE PUSH2 0xE5 JUMPI CALLVALUE PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0xDD SWAP2 SWAP1 PUSH2 0xA78 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE STOP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0xF6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x111 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x10C SWAP2 SWAP1 PUSH2 0xAEC JUMP JUMPDEST PUSH2 0x328 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x11E SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x133 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x13C PUSH2 0x340 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x149 SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x15E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x167 PUSH2 0x346 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x174 SWAP2 SWAP1 PUSH2 0xBC2 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x189 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1A4 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x19F SWAP2 SWAP1 PUSH2 0xD36 JUMP JUMPDEST PUSH2 0x36C JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1B2 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1CD PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x1C8 SWAP2 SWAP1 PUSH2 0xDBD JUMP JUMPDEST PUSH2 0x72A JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x1DA SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1EF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1F8 PUSH2 0x742 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x206 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x20F PUSH2 0x756 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x21C SWAP2 SWAP1 PUSH2 0xDF9 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x231 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x23A PUSH2 0x77F JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x247 SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x25C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x277 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x272 SWAP2 SWAP1 PUSH2 0xAEC JUMP JUMPDEST PUSH2 0x785 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x284 SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x299 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x2B4 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x2AF SWAP2 SWAP1 PUSH2 0xDBD JUMP JUMPDEST PUSH2 0x79D JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x2C1 SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x2D2 PUSH2 0x842 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2E0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x2E9 PUSH2 0x85D JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x2F6 SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x30B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x326 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x321 SWAP2 SWAP1 PUSH2 0xDBD JUMP JUMPDEST PUSH2 0x867 JUMP JUMPDEST STOP JUMPDEST PUSH1 0x5 PUSH1 0x20 MSTORE DUP1 PUSH1 0x0 MSTORE PUSH1 0x40 PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP2 POP SWAP1 POP SLOAD DUP2 JUMP JUMPDEST PUSH1 0x3 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x1 SWAP1 POP JUMPDEST DUP3 MLOAD DUP2 GT PUSH2 0x630 JUMPI PUSH1 0x0 DUP4 DUP3 DUP2 MLOAD DUP2 LT PUSH2 0x391 JUMPI PUSH2 0x390 PUSH2 0xE14 JUMP JUMPDEST JUMPDEST PUSH1 0x20 MUL PUSH1 0x20 ADD ADD MLOAD SWAP1 POP CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x6352211E DUP4 PUSH1 0x40 MLOAD DUP3 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x40D SWAP2 SWAP1 PUSH2 0xB28 JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x42A JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x44E SWAP2 SWAP1 PUSH2 0xE58 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x4A4 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x49B SWAP1 PUSH2 0xF08 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x5 PUSH1 0x0 DUP4 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH1 0x2 SLOAD PUSH2 0x4C7 SWAP2 SWAP1 PUSH2 0xF28 JUMP JUMPDEST GT ISZERO PUSH2 0x61C JUMPI PUSH9 0x3635C9ADC5DEA00000 PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x18160DDD PUSH1 0x40 MLOAD DUP2 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x544 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x568 SWAP2 SWAP1 PUSH2 0xF71 JUMP JUMPDEST PUSH9 0x3635C9ADC5DEA00000 PUSH1 0x5 PUSH1 0x0 DUP6 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH1 0x2 SLOAD PUSH2 0x593 SWAP2 SWAP1 PUSH2 0xF28 JUMP JUMPDEST PUSH2 0x59D SWAP2 SWAP1 PUSH2 0xF9E JUMP JUMPDEST PUSH2 0x5A7 SWAP2 SWAP1 PUSH2 0x100F JUMP JUMPDEST PUSH2 0x5B1 SWAP2 SWAP1 PUSH2 0xF9E JUMP JUMPDEST DUP4 PUSH2 0x5BC SWAP2 SWAP1 PUSH2 0xA78 JUMP JUMPDEST SWAP3 POP DUP3 PUSH1 0x6 PUSH1 0x0 DUP4 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x5E1 SWAP2 SWAP1 PUSH2 0xA78 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP PUSH1 0x2 SLOAD PUSH1 0x5 PUSH1 0x0 DUP4 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP DUP3 PUSH1 0x3 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x614 SWAP2 SWAP1 PUSH2 0xA78 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP JUMPDEST POP DUP1 DUP1 PUSH2 0x628 SWAP1 PUSH2 0x1040 JUMP JUMPDEST SWAP2 POP POP PUSH2 0x374 JUMP JUMPDEST POP PUSH1 0x0 DUP2 GT PUSH2 0x674 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x66B SWAP1 PUSH2 0x10D4 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH2 0x5E4A SWAP1 PUSH1 0x40 MLOAD PUSH2 0x69C SWAP1 PUSH2 0x1125 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x6DA JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x6DF JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP POP TIMESTAMP PUSH1 0x4 PUSH1 0x0 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP POP POP JUMP JUMPDEST PUSH1 0x4 PUSH1 0x20 MSTORE DUP1 PUSH1 0x0 MSTORE PUSH1 0x40 PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP2 POP SWAP1 POP SLOAD DUP2 JUMP JUMPDEST PUSH2 0x74A PUSH2 0x8F5 JUMP JUMPDEST PUSH2 0x754 PUSH1 0x0 PUSH2 0x973 JUMP JUMPDEST JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x2 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x6 PUSH1 0x20 MSTORE DUP1 PUSH1 0x0 MSTORE PUSH1 0x40 PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP2 POP SWAP1 POP SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x70A08231 DUP4 PUSH1 0x40 MLOAD DUP3 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x7FA SWAP2 SWAP1 PUSH2 0xDF9 JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x817 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x83B SWAP2 SWAP1 PUSH2 0xF71 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST CALLVALUE PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x854 SWAP2 SWAP1 PUSH2 0xA78 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH20 0x791F1CFB231E7C75EEE4B7F8913E3C2B3548EB93 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x8E9 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x8E0 SWAP1 PUSH2 0x1186 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x8F2 DUP2 PUSH2 0x973 JUMP JUMPDEST POP JUMP JUMPDEST PUSH2 0x8FD PUSH2 0xA37 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x91B PUSH2 0x756 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x971 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x968 SWAP1 PUSH2 0x11F2 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP DUP2 PUSH1 0x0 DUP1 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 PUSH1 0x40 MLOAD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH1 0x0 CALLER SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 PUSH2 0xA83 DUP3 PUSH2 0xA3F JUMP JUMPDEST SWAP2 POP PUSH2 0xA8E DUP4 PUSH2 0xA3F JUMP JUMPDEST SWAP3 POP DUP3 DUP3 ADD SWAP1 POP DUP1 DUP3 GT ISZERO PUSH2 0xAA6 JUMPI PUSH2 0xAA5 PUSH2 0xA49 JUMP JUMPDEST JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 MLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xAC9 DUP2 PUSH2 0xA3F JUMP JUMPDEST DUP2 EQ PUSH2 0xAD4 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0xAE6 DUP2 PUSH2 0xAC0 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xB02 JUMPI PUSH2 0xB01 PUSH2 0xAB6 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0xB10 DUP5 DUP3 DUP6 ADD PUSH2 0xAD7 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0xB22 DUP2 PUSH2 0xA3F JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xB3D PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xB19 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xB88 PUSH2 0xB83 PUSH2 0xB7E DUP5 PUSH2 0xB43 JUMP JUMPDEST PUSH2 0xB63 JUMP JUMPDEST PUSH2 0xB43 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xB9A DUP3 PUSH2 0xB6D JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xBAC DUP3 PUSH2 0xB8F JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0xBBC DUP2 PUSH2 0xBA1 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xBD7 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xBB3 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH2 0xC2B DUP3 PUSH2 0xBE2 JUMP JUMPDEST DUP2 ADD DUP2 DUP2 LT PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT OR ISZERO PUSH2 0xC4A JUMPI PUSH2 0xC49 PUSH2 0xBF3 JUMP JUMPDEST JUMPDEST DUP1 PUSH1 0x40 MSTORE POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xC5D PUSH2 0xAAC JUMP JUMPDEST SWAP1 POP PUSH2 0xC69 DUP3 DUP3 PUSH2 0xC22 JUMP JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT ISZERO PUSH2 0xC89 JUMPI PUSH2 0xC88 PUSH2 0xBF3 JUMP JUMPDEST JUMPDEST PUSH1 0x20 DUP3 MUL SWAP1 POP PUSH1 0x20 DUP2 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH2 0xCB2 PUSH2 0xCAD DUP5 PUSH2 0xC6E JUMP JUMPDEST PUSH2 0xC53 JUMP JUMPDEST SWAP1 POP DUP1 DUP4 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH1 0x20 DUP5 MUL DUP4 ADD DUP6 DUP2 GT ISZERO PUSH2 0xCD5 JUMPI PUSH2 0xCD4 PUSH2 0xC9A JUMP JUMPDEST JUMPDEST DUP4 JUMPDEST DUP2 DUP2 LT ISZERO PUSH2 0xCFE JUMPI DUP1 PUSH2 0xCEA DUP9 DUP3 PUSH2 0xAD7 JUMP JUMPDEST DUP5 MSTORE PUSH1 0x20 DUP5 ADD SWAP4 POP POP PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0xCD7 JUMP JUMPDEST POP POP POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH1 0x1F DUP4 ADD SLT PUSH2 0xD1D JUMPI PUSH2 0xD1C PUSH2 0xBDD JUMP JUMPDEST JUMPDEST DUP2 CALLDATALOAD PUSH2 0xD2D DUP5 DUP3 PUSH1 0x20 DUP7 ADD PUSH2 0xC9F JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xD4C JUMPI PUSH2 0xD4B PUSH2 0xAB6 JUMP JUMPDEST JUMPDEST PUSH1 0x0 DUP3 ADD CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0xD6A JUMPI PUSH2 0xD69 PUSH2 0xABB JUMP JUMPDEST JUMPDEST PUSH2 0xD76 DUP5 DUP3 DUP6 ADD PUSH2 0xD08 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xD8A DUP3 PUSH2 0xB43 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0xD9A DUP2 PUSH2 0xD7F JUMP JUMPDEST DUP2 EQ PUSH2 0xDA5 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0xDB7 DUP2 PUSH2 0xD91 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xDD3 JUMPI PUSH2 0xDD2 PUSH2 0xAB6 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0xDE1 DUP5 DUP3 DUP6 ADD PUSH2 0xDA8 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0xDF3 DUP2 PUSH2 0xD7F JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xE0E PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xDEA JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x32 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP PUSH2 0xE52 DUP2 PUSH2 0xD91 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xE6E JUMPI PUSH2 0xE6D PUSH2 0xAB6 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0xE7C DUP5 DUP3 DUP6 ADD PUSH2 0xE43 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x596F75206D75737420626520746865206F776E6572206F6620616E204E465420 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x746F20636C61696D2066756E64732E0000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xEF2 PUSH1 0x2F DUP4 PUSH2 0xE85 JUMP JUMPDEST SWAP2 POP PUSH2 0xEFD DUP3 PUSH2 0xE96 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xF21 DUP2 PUSH2 0xEE5 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xF33 DUP3 PUSH2 0xA3F JUMP JUMPDEST SWAP2 POP PUSH2 0xF3E DUP4 PUSH2 0xA3F JUMP JUMPDEST SWAP3 POP DUP3 DUP3 SUB SWAP1 POP DUP2 DUP2 GT ISZERO PUSH2 0xF56 JUMPI PUSH2 0xF55 PUSH2 0xA49 JUMP JUMPDEST JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP PUSH2 0xF6B DUP2 PUSH2 0xAC0 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xF87 JUMPI PUSH2 0xF86 PUSH2 0xAB6 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0xF95 DUP5 DUP3 DUP6 ADD PUSH2 0xF5C JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xFA9 DUP3 PUSH2 0xA3F JUMP JUMPDEST SWAP2 POP PUSH2 0xFB4 DUP4 PUSH2 0xA3F JUMP JUMPDEST SWAP3 POP DUP3 DUP3 MUL PUSH2 0xFC2 DUP2 PUSH2 0xA3F JUMP JUMPDEST SWAP2 POP DUP3 DUP3 DIV DUP5 EQ DUP4 ISZERO OR PUSH2 0xFD9 JUMPI PUSH2 0xFD8 PUSH2 0xA49 JUMP JUMPDEST JUMPDEST POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x12 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 PUSH2 0x101A DUP3 PUSH2 0xA3F JUMP JUMPDEST SWAP2 POP PUSH2 0x1025 DUP4 PUSH2 0xA3F JUMP JUMPDEST SWAP3 POP DUP3 PUSH2 0x1035 JUMPI PUSH2 0x1034 PUSH2 0xFE0 JUMP JUMPDEST JUMPDEST DUP3 DUP3 DIV SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x104B DUP3 PUSH2 0xA3F JUMP JUMPDEST SWAP2 POP PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 SUB PUSH2 0x107D JUMPI PUSH2 0x107C PUSH2 0xA49 JUMP JUMPDEST JUMPDEST PUSH1 0x1 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E6F2066756E647320746F20636C61696D000000000000000000000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x10BE PUSH1 0x11 DUP4 PUSH2 0xE85 JUMP JUMPDEST SWAP2 POP PUSH2 0x10C9 DUP3 PUSH2 0x1088 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x10ED DUP2 PUSH2 0x10B1 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x110F PUSH1 0x0 DUP4 PUSH2 0x10F4 JUMP JUMPDEST SWAP2 POP PUSH2 0x111A DUP3 PUSH2 0x10FF JUMP JUMPDEST PUSH1 0x0 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1130 DUP3 PUSH2 0x1102 JUMP JUMPDEST SWAP2 POP DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x6E6F000000000000000000000000000000000000000000000000000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1170 PUSH1 0x2 DUP4 PUSH2 0xE85 JUMP JUMPDEST SWAP2 POP PUSH2 0x117B DUP3 PUSH2 0x113A JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x119F DUP2 PUSH2 0x1163 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4F776E61626C653A2063616C6C6572206973206E6F7420746865206F776E6572 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x11DC PUSH1 0x20 DUP4 PUSH2 0xE85 JUMP JUMPDEST SWAP2 POP PUSH2 0x11E7 DUP3 PUSH2 0x11A6 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x120B DUP2 PUSH2 0x11CF JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xED 0xBB 0x22 0xCF KECCAK256 SWAP15 0xDD GAS 0xE1 0xE0 PUSH30 0x2888D426EBA9D34F104C1CF4C08A40EB282C0CA65F64736F6C6343000811 STOP CALLER ",
			"sourceMap": "111:3132:19:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1330:9;1316:10;;:23;;;;;;;:::i;:::-;;;;;;;;111:3132;;;;690:43;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;423:26;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;204:19;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1864:923;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;636:50;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1831:101:0;;;;;;;;;;;;;:::i;:::-;;1201:85;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;338:25:19;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;737:41;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;3132:108;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1525:68;;;:::i;:::-;;2917:82;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;790:203;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;690:43;;;;;;;;;;;;;;;;;:::o;423:26::-;;;;:::o;204:19::-;;;;;;;;;;;;;:::o;1864:923::-;1972:21;2004:9;2016:1;2004:13;;1999:603;2024:5;:12;2019:1;:17;1999:603;;2052:12;2067:5;2073:1;2067:8;;;;;;;;:::i;:::-;;;;;;;;2052:23;;2110:10;2089:31;;:3;;;;;;;;;;;:11;;;2101:4;2089:17;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;:31;;;2081:91;;;;;;;;;;;;:::i;:::-;;;;;;;;;2213:1;2196:8;:14;2205:4;2196:14;;;;;;;;;;;;2183:10;;:27;;;;:::i;:::-;:31;2179:417;;;2468:22;2448:3;;;;;;;;;;;:15;;;:17;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;2423:22;2405:8;:14;2414:4;2405:14;;;;;;;;;;;;2392:10;;:27;;;;:::i;:::-;2391:54;;;;:::i;:::-;:74;;;;:::i;:::-;:99;;;;:::i;:::-;2374:116;;;;;:::i;:::-;;;2513:13;2497:6;:12;2504:4;2497:12;;;;;;;;;;;;:29;;;;;;;:::i;:::-;;;;;;;;2549:10;;2532:8;:14;2541:4;2532:14;;;;;;;;;;;:27;;;;2576:13;2561:11;;:28;;;;;;;:::i;:::-;;;;;;;;2179:417;2042:560;2038:3;;;;;:::i;:::-;;;;1999:603;;;;2632:1;2616:13;:17;2608:47;;;;;;;;;;;;:::i;:::-;;;;;;;;;2677:10;2661:33;;2701:13;2721:5;2661:70;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2767:15;2737;:27;2753:10;2737:27;;;;;;;;;;;;;;;:45;;;;1912:875;1864:923;:::o;636:50::-;;;;;;;;;;;;;;;;;:::o;1831:101:0:-;1094:13;:11;:13::i;:::-;1895:30:::1;1922:1;1895:18;:30::i;:::-;1831:101::o:0;1201:85::-;1247:7;1273:6;;;;;;;;;;;1266:13;;1201:85;:::o;338:25:19:-;;;;:::o;737:41::-;;;;;;;;;;;;;;;;;:::o;3132:108::-;3191:7;3213:3;;;;;;;;;;;:13;;;3227:5;3213:20;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;3206:27;;3132:108;;;:::o;1525:68::-;1579:9;1565:10;;:23;;;;;;;:::i;:::-;;;;;;;;1525:68::o;2917:82::-;2963:4;2982:10;;2975:17;;2917:82;:::o;790:203::-;889:42;875:56;;:10;:56;;;867:71;;;;;;;;;;;;:::i;:::-;;;;;;;;;953:28;972:8;953:18;:28::i;:::-;790:203;:::o;1359:130:0:-;1433:12;:10;:12::i;:::-;1422:23;;:7;:5;:7::i;:::-;:23;;;1414:68;;;;;;;;;;;;:::i;:::-;;;;;;;;;1359:130::o;2433:187::-;2506:16;2525:6;;;;;;;;;;;2506:25;;2550:8;2541:6;;:17;;;;;;;;;;;;;;;;;;2604:8;2573:40;;2594:8;2573:40;;;;;;;;;;;;2496:124;2433:187;:::o;640:96:11:-;693:7;719:10;712:17;;640:96;:::o;7:77:22:-;44:7;73:5;62:16;;7:77;;;:::o;90:180::-;138:77;135:1;128:88;235:4;232:1;225:15;259:4;256:1;249:15;276:191;316:3;335:20;353:1;335:20;:::i;:::-;330:25;;369:20;387:1;369:20;:::i;:::-;364:25;;412:1;409;405:9;398:16;;433:3;430:1;427:10;424:36;;;440:18;;:::i;:::-;424:36;276:191;;;;:::o;473:75::-;506:6;539:2;533:9;523:19;;473:75;:::o;554:117::-;663:1;660;653:12;677:117;786:1;783;776:12;800:122;873:24;891:5;873:24;:::i;:::-;866:5;863:35;853:63;;912:1;909;902:12;853:63;800:122;:::o;928:139::-;974:5;1012:6;999:20;990:29;;1028:33;1055:5;1028:33;:::i;:::-;928:139;;;;:::o;1073:329::-;1132:6;1181:2;1169:9;1160:7;1156:23;1152:32;1149:119;;;1187:79;;:::i;:::-;1149:119;1307:1;1332:53;1377:7;1368:6;1357:9;1353:22;1332:53;:::i;:::-;1322:63;;1278:117;1073:329;;;;:::o;1408:118::-;1495:24;1513:5;1495:24;:::i;:::-;1490:3;1483:37;1408:118;;:::o;1532:222::-;1625:4;1663:2;1652:9;1648:18;1640:26;;1676:71;1744:1;1733:9;1729:17;1720:6;1676:71;:::i;:::-;1532:222;;;;:::o;1760:126::-;1797:7;1837:42;1830:5;1826:54;1815:65;;1760:126;;;:::o;1892:60::-;1920:3;1941:5;1934:12;;1892:60;;;:::o;1958:142::-;2008:9;2041:53;2059:34;2068:24;2086:5;2068:24;:::i;:::-;2059:34;:::i;:::-;2041:53;:::i;:::-;2028:66;;1958:142;;;:::o;2106:126::-;2156:9;2189:37;2220:5;2189:37;:::i;:::-;2176:50;;2106:126;;;:::o;2238:143::-;2305:9;2338:37;2369:5;2338:37;:::i;:::-;2325:50;;2238:143;;;:::o;2387:165::-;2491:54;2539:5;2491:54;:::i;:::-;2486:3;2479:67;2387:165;;:::o;2558:256::-;2668:4;2706:2;2695:9;2691:18;2683:26;;2719:88;2804:1;2793:9;2789:17;2780:6;2719:88;:::i;:::-;2558:256;;;;:::o;2820:117::-;2929:1;2926;2919:12;2943:102;2984:6;3035:2;3031:7;3026:2;3019:5;3015:14;3011:28;3001:38;;2943:102;;;:::o;3051:180::-;3099:77;3096:1;3089:88;3196:4;3193:1;3186:15;3220:4;3217:1;3210:15;3237:281;3320:27;3342:4;3320:27;:::i;:::-;3312:6;3308:40;3450:6;3438:10;3435:22;3414:18;3402:10;3399:34;3396:62;3393:88;;;3461:18;;:::i;:::-;3393:88;3501:10;3497:2;3490:22;3280:238;3237:281;;:::o;3524:129::-;3558:6;3585:20;;:::i;:::-;3575:30;;3614:33;3642:4;3634:6;3614:33;:::i;:::-;3524:129;;;:::o;3659:311::-;3736:4;3826:18;3818:6;3815:30;3812:56;;;3848:18;;:::i;:::-;3812:56;3898:4;3890:6;3886:17;3878:25;;3958:4;3952;3948:15;3940:23;;3659:311;;;:::o;3976:117::-;4085:1;4082;4075:12;4116:710;4212:5;4237:81;4253:64;4310:6;4253:64;:::i;:::-;4237:81;:::i;:::-;4228:90;;4338:5;4367:6;4360:5;4353:21;4401:4;4394:5;4390:16;4383:23;;4454:4;4446:6;4442:17;4434:6;4430:30;4483:3;4475:6;4472:15;4469:122;;;4502:79;;:::i;:::-;4469:122;4617:6;4600:220;4634:6;4629:3;4626:15;4600:220;;;4709:3;4738:37;4771:3;4759:10;4738:37;:::i;:::-;4733:3;4726:50;4805:4;4800:3;4796:14;4789:21;;4676:144;4660:4;4655:3;4651:14;4644:21;;4600:220;;;4604:21;4218:608;;4116:710;;;;;:::o;4849:370::-;4920:5;4969:3;4962:4;4954:6;4950:17;4946:27;4936:122;;4977:79;;:::i;:::-;4936:122;5094:6;5081:20;5119:94;5209:3;5201:6;5194:4;5186:6;5182:17;5119:94;:::i;:::-;5110:103;;4926:293;4849:370;;;;:::o;5225:539::-;5309:6;5358:2;5346:9;5337:7;5333:23;5329:32;5326:119;;;5364:79;;:::i;:::-;5326:119;5512:1;5501:9;5497:17;5484:31;5542:18;5534:6;5531:30;5528:117;;;5564:79;;:::i;:::-;5528:117;5669:78;5739:7;5730:6;5719:9;5715:22;5669:78;:::i;:::-;5659:88;;5455:302;5225:539;;;;:::o;5770:96::-;5807:7;5836:24;5854:5;5836:24;:::i;:::-;5825:35;;5770:96;;;:::o;5872:122::-;5945:24;5963:5;5945:24;:::i;:::-;5938:5;5935:35;5925:63;;5984:1;5981;5974:12;5925:63;5872:122;:::o;6000:139::-;6046:5;6084:6;6071:20;6062:29;;6100:33;6127:5;6100:33;:::i;:::-;6000:139;;;;:::o;6145:329::-;6204:6;6253:2;6241:9;6232:7;6228:23;6224:32;6221:119;;;6259:79;;:::i;:::-;6221:119;6379:1;6404:53;6449:7;6440:6;6429:9;6425:22;6404:53;:::i;:::-;6394:63;;6350:117;6145:329;;;;:::o;6480:118::-;6567:24;6585:5;6567:24;:::i;:::-;6562:3;6555:37;6480:118;;:::o;6604:222::-;6697:4;6735:2;6724:9;6720:18;6712:26;;6748:71;6816:1;6805:9;6801:17;6792:6;6748:71;:::i;:::-;6604:222;;;;:::o;6832:180::-;6880:77;6877:1;6870:88;6977:4;6974:1;6967:15;7001:4;6998:1;6991:15;7018:143;7075:5;7106:6;7100:13;7091:22;;7122:33;7149:5;7122:33;:::i;:::-;7018:143;;;;:::o;7167:351::-;7237:6;7286:2;7274:9;7265:7;7261:23;7257:32;7254:119;;;7292:79;;:::i;:::-;7254:119;7412:1;7437:64;7493:7;7484:6;7473:9;7469:22;7437:64;:::i;:::-;7427:74;;7383:128;7167:351;;;;:::o;7524:169::-;7608:11;7642:6;7637:3;7630:19;7682:4;7677:3;7673:14;7658:29;;7524:169;;;;:::o;7699:234::-;7839:34;7835:1;7827:6;7823:14;7816:58;7908:17;7903:2;7895:6;7891:15;7884:42;7699:234;:::o;7939:366::-;8081:3;8102:67;8166:2;8161:3;8102:67;:::i;:::-;8095:74;;8178:93;8267:3;8178:93;:::i;:::-;8296:2;8291:3;8287:12;8280:19;;7939:366;;;:::o;8311:419::-;8477:4;8515:2;8504:9;8500:18;8492:26;;8564:9;8558:4;8554:20;8550:1;8539:9;8535:17;8528:47;8592:131;8718:4;8592:131;:::i;:::-;8584:139;;8311:419;;;:::o;8736:194::-;8776:4;8796:20;8814:1;8796:20;:::i;:::-;8791:25;;8830:20;8848:1;8830:20;:::i;:::-;8825:25;;8874:1;8871;8867:9;8859:17;;8898:1;8892:4;8889:11;8886:37;;;8903:18;;:::i;:::-;8886:37;8736:194;;;;:::o;8936:143::-;8993:5;9024:6;9018:13;9009:22;;9040:33;9067:5;9040:33;:::i;:::-;8936:143;;;;:::o;9085:351::-;9155:6;9204:2;9192:9;9183:7;9179:23;9175:32;9172:119;;;9210:79;;:::i;:::-;9172:119;9330:1;9355:64;9411:7;9402:6;9391:9;9387:22;9355:64;:::i;:::-;9345:74;;9301:128;9085:351;;;;:::o;9442:410::-;9482:7;9505:20;9523:1;9505:20;:::i;:::-;9500:25;;9539:20;9557:1;9539:20;:::i;:::-;9534:25;;9594:1;9591;9587:9;9616:30;9634:11;9616:30;:::i;:::-;9605:41;;9795:1;9786:7;9782:15;9779:1;9776:22;9756:1;9749:9;9729:83;9706:139;;9825:18;;:::i;:::-;9706:139;9490:362;9442:410;;;;:::o;9858:180::-;9906:77;9903:1;9896:88;10003:4;10000:1;9993:15;10027:4;10024:1;10017:15;10044:185;10084:1;10101:20;10119:1;10101:20;:::i;:::-;10096:25;;10135:20;10153:1;10135:20;:::i;:::-;10130:25;;10174:1;10164:35;;10179:18;;:::i;:::-;10164:35;10221:1;10218;10214:9;10209:14;;10044:185;;;;:::o;10235:233::-;10274:3;10297:24;10315:5;10297:24;:::i;:::-;10288:33;;10343:66;10336:5;10333:77;10330:103;;10413:18;;:::i;:::-;10330:103;10460:1;10453:5;10449:13;10442:20;;10235:233;;;:::o;10474:167::-;10614:19;10610:1;10602:6;10598:14;10591:43;10474:167;:::o;10647:366::-;10789:3;10810:67;10874:2;10869:3;10810:67;:::i;:::-;10803:74;;10886:93;10975:3;10886:93;:::i;:::-;11004:2;10999:3;10995:12;10988:19;;10647:366;;;:::o;11019:419::-;11185:4;11223:2;11212:9;11208:18;11200:26;;11272:9;11266:4;11262:20;11258:1;11247:9;11243:17;11236:47;11300:131;11426:4;11300:131;:::i;:::-;11292:139;;11019:419;;;:::o;11444:147::-;11545:11;11582:3;11567:18;;11444:147;;;;:::o;11597:114::-;;:::o;11717:398::-;11876:3;11897:83;11978:1;11973:3;11897:83;:::i;:::-;11890:90;;11989:93;12078:3;11989:93;:::i;:::-;12107:1;12102:3;12098:11;12091:18;;11717:398;;;:::o;12121:379::-;12305:3;12327:147;12470:3;12327:147;:::i;:::-;12320:154;;12491:3;12484:10;;12121:379;;;:::o;12506:152::-;12646:4;12642:1;12634:6;12630:14;12623:28;12506:152;:::o;12664:365::-;12806:3;12827:66;12891:1;12886:3;12827:66;:::i;:::-;12820:73;;12902:93;12991:3;12902:93;:::i;:::-;13020:2;13015:3;13011:12;13004:19;;12664:365;;;:::o;13035:419::-;13201:4;13239:2;13228:9;13224:18;13216:26;;13288:9;13282:4;13278:20;13274:1;13263:9;13259:17;13252:47;13316:131;13442:4;13316:131;:::i;:::-;13308:139;;13035:419;;;:::o;13460:182::-;13600:34;13596:1;13588:6;13584:14;13577:58;13460:182;:::o;13648:366::-;13790:3;13811:67;13875:2;13870:3;13811:67;:::i;:::-;13804:74;;13887:93;13976:3;13887:93;:::i;:::-;14005:2;14000:3;13996:12;13989:19;;13648:366;;;:::o;14020:419::-;14186:4;14224:2;14213:9;14209:18;14201:26;;14273:9;14267:4;14263:20;14259:1;14248:9;14244:17;14237:47;14301:131;14427:4;14301:131;:::i;:::-;14293:139;;14020:419;;;:::o"
		},
		"gasEstimates": {
			"creation": {
				"codeDepositCost": "936000",
				"executionCost": "infinite",
				"totalCost": "infinite"
			},
			"external": {
				"claim(uint256[])": "infinite",
				"claimTimestamps(address)": "2903",
				"claims(uint256)": "infinite",
				"deposit()": "infinite",
				"getNFTBalance(address)": "infinite",
				"getTotalFunds()": "2503",
				"lastMark(uint256)": "infinite",
				"nft()": "infinite",
				"owner()": "2545",
				"renounceOwnership()": "30509",
				"totalClaims()": "2452",
				"totalFunds()": "2474",
				"transferOwnership(address)": "28567"
			}
		},
		"methodIdentifiers": {
			"claim(uint256[])": "6ba4c138",
			"claimTimestamps(address)": "6f8b65a4",
			"claims(uint256)": "a888c2cd",
			"deposit()": "d0e30db0",
			"getNFTBalance(address)": "bf8ebd85",
			"getTotalFunds()": "eb8bbd28",
			"lastMark(uint256)": "2c110641",
			"nft()": "47ccca02",
			"owner()": "8da5cb5b",
			"renounceOwnership()": "715018a6",
			"totalClaims()": "41c61383",
			"totalFunds()": "968ed600",
			"transferOwnership(address)": "f2fde38b"
		}
	},
	"abi": [
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_nftAddress",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint256[]",
					"name": "_nfts",
					"type": "uint256[]"
				}
			],
			"name": "claim",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "claimTimestamps",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "claims",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "deposit",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "getNFTBalance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getTotalFunds",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "lastMark",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "nft",
			"outputs": [
				{
					"internalType": "contract GameItem",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "renounceOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalClaims",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalFunds",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "receive"
		}
	]
}
const tokfanoutAbi = {
	"deploy": {
		"VM:-": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"main:1": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"ropsten:3": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"rinkeby:4": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"kovan:42": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"goerli:5": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"Custom": {
			"linkReferences": {},
			"autoDeployLib": true
		}
	},
	"data": {
		"bytecode": {
			"functionDebugData": {
				"@_23": {
					"entryPoint": null,
					"id": 23,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@_4691": {
					"entryPoint": null,
					"id": 4691,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@_msgSender_2419": {
					"entryPoint": 50,
					"id": 2419,
					"parameterSlots": 0,
					"returnSlots": 1
				},
				"@_transferOwnership_111": {
					"entryPoint": 58,
					"id": 111,
					"parameterSlots": 1,
					"returnSlots": 0
				}
			},
			"generatedSources": [],
			"linkReferences": {},
			"object": "608060405234801561001057600080fd5b5061002d61002261003260201b60201c565b61003a60201b60201c565b6100fe565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6110148061010d6000396000f3fe6080604052600436106100c65760003560e01c80638da5cb5b1161007f578063d0e30db011610059578063d0e30db01461028b578063eb8bbd2814610295578063f2fde38b146102c0578063fc0c546a146102e9576100e5565b80638da5cb5b146101f8578063968ed60014610223578063c6788bdd1461024e576100e5565b806326a4e8d2146100ea5780634e71d92d146101135780635821b68a1461012a5780636f8b65a414610167578063715018a6146101a457806377f46763146101bb576100e5565b366100e55734600260008282546100dd9190610af0565b925050819055005b600080fd5b3480156100f657600080fd5b50610111600480360381019061010c9190610b87565b610314565b005b34801561011f57600080fd5b50610128610360565b005b34801561013657600080fd5b50610151600480360381019061014c9190610b87565b610764565b60405161015e9190610bc3565b60405180910390f35b34801561017357600080fd5b5061018e60048036038101906101899190610b87565b610809565b60405161019b9190610bc3565b60405180910390f35b3480156101b057600080fd5b506101b9610821565b005b3480156101c757600080fd5b506101e260048036038101906101dd9190610b87565b610835565b6040516101ef9190610bc3565b60405180910390f35b34801561020457600080fd5b5061020d61084d565b60405161021a9190610bed565b60405180910390f35b34801561022f57600080fd5b50610238610876565b6040516102459190610bc3565b60405180910390f35b34801561025a57600080fd5b5061027560048036038101906102709190610b87565b61087c565b6040516102829190610bc3565b60405180910390f35b610293610894565b005b3480156102a157600080fd5b506102aa6108af565b6040516102b79190610bc3565b60405180910390f35b3480156102cc57600080fd5b506102e760048036038101906102e29190610b87565b6108b9565b005b3480156102f557600080fd5b506102fe610947565b60405161030b9190610c67565b60405180910390f35b61031c61096d565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016103bd9190610bed565b602060405180830381865afa1580156103da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103fe9190610cae565b1161043e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161043590610d5e565b60405180910390fd5b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104d19190610cae565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b815260040161052c9190610bed565b602060405180830381865afa158015610549573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056d9190610cae565b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546002546105ba9190610d7e565b6105c49190610db2565b6105ce9190610e23565b905060008111610613576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060a90610ea0565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168161d37a9060405161063b90610ef1565b600060405180830381858888f193505050503d8060008114610679576040519150601f19603f3d011682016040523d82523d6000602084013e61067e565b606091505b50505080600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546106d09190610af0565b92505081905550600254600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555042600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231836040518263ffffffff1660e01b81526004016107c19190610bed565b602060405180830381865afa1580156107de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108029190610cae565b9050919050565b60036020528060005260406000206000915090505481565b61082961096d565b61083360006109eb565b565b60046020528060005260406000206000915090505481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60025481565b60056020528060005260406000206000915090505481565b34600260008282546108a69190610af0565b92505081905550565b6000600254905090565b73791f1cfb231e7c75eee4b7f8913e3c2b3548eb9373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461093b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093290610f52565b60405180910390fd5b610944816109eb565b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610975610aaf565b73ffffffffffffffffffffffffffffffffffffffff1661099361084d565b73ffffffffffffffffffffffffffffffffffffffff16146109e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e090610fbe565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610afb82610ab7565b9150610b0683610ab7565b9250828201905080821115610b1e57610b1d610ac1565b5b92915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610b5482610b29565b9050919050565b610b6481610b49565b8114610b6f57600080fd5b50565b600081359050610b8181610b5b565b92915050565b600060208284031215610b9d57610b9c610b24565b5b6000610bab84828501610b72565b91505092915050565b610bbd81610ab7565b82525050565b6000602082019050610bd86000830184610bb4565b92915050565b610be781610b49565b82525050565b6000602082019050610c026000830184610bde565b92915050565b6000819050919050565b6000610c2d610c28610c2384610b29565b610c08565b610b29565b9050919050565b6000610c3f82610c12565b9050919050565b6000610c5182610c34565b9050919050565b610c6181610c46565b82525050565b6000602082019050610c7c6000830184610c58565b92915050565b610c8b81610ab7565b8114610c9657600080fd5b50565b600081519050610ca881610c82565b92915050565b600060208284031215610cc457610cc3610b24565b5b6000610cd284828501610c99565b91505092915050565b600082825260208201905092915050565b7f596f75206d75737420626520746865206f776e6572206f6620616e20746f6b6560008201527f6e20746f20636c61696d2066756e64732e000000000000000000000000000000602082015250565b6000610d48603183610cdb565b9150610d5382610cec565b604082019050919050565b60006020820190508181036000830152610d7781610d3b565b9050919050565b6000610d8982610ab7565b9150610d9483610ab7565b9250828203905081811115610dac57610dab610ac1565b5b92915050565b6000610dbd82610ab7565b9150610dc883610ab7565b9250828202610dd681610ab7565b91508282048414831517610ded57610dec610ac1565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610e2e82610ab7565b9150610e3983610ab7565b925082610e4957610e48610df4565b5b828204905092915050565b7f4e6f2066756e647320746f20636c61696d000000000000000000000000000000600082015250565b6000610e8a601183610cdb565b9150610e9582610e54565b602082019050919050565b60006020820190508181036000830152610eb981610e7d565b9050919050565b600081905092915050565b50565b6000610edb600083610ec0565b9150610ee682610ecb565b600082019050919050565b6000610efc82610ece565b9150819050919050565b7f6e6f000000000000000000000000000000000000000000000000000000000000600082015250565b6000610f3c600283610cdb565b9150610f4782610f06565b602082019050919050565b60006020820190508181036000830152610f6b81610f2f565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610fa8602083610cdb565b9150610fb382610f72565b602082019050919050565b60006020820190508181036000830152610fd781610f9b565b905091905056fea26469706673582212209426c4a93a7e3611c2bfe671f5a873d9b1713af638b50934980af8ae345efb5364736f6c63430008110033",
			"opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x2D PUSH2 0x22 PUSH2 0x32 PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST PUSH2 0x3A PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST PUSH2 0xFE JUMP JUMPDEST PUSH1 0x0 CALLER SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP DUP2 PUSH1 0x0 DUP1 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 PUSH1 0x40 MLOAD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH2 0x1014 DUP1 PUSH2 0x10D PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0xC6 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x8DA5CB5B GT PUSH2 0x7F JUMPI DUP1 PUSH4 0xD0E30DB0 GT PUSH2 0x59 JUMPI DUP1 PUSH4 0xD0E30DB0 EQ PUSH2 0x28B JUMPI DUP1 PUSH4 0xEB8BBD28 EQ PUSH2 0x295 JUMPI DUP1 PUSH4 0xF2FDE38B EQ PUSH2 0x2C0 JUMPI DUP1 PUSH4 0xFC0C546A EQ PUSH2 0x2E9 JUMPI PUSH2 0xE5 JUMP JUMPDEST DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0x1F8 JUMPI DUP1 PUSH4 0x968ED600 EQ PUSH2 0x223 JUMPI DUP1 PUSH4 0xC6788BDD EQ PUSH2 0x24E JUMPI PUSH2 0xE5 JUMP JUMPDEST DUP1 PUSH4 0x26A4E8D2 EQ PUSH2 0xEA JUMPI DUP1 PUSH4 0x4E71D92D EQ PUSH2 0x113 JUMPI DUP1 PUSH4 0x5821B68A EQ PUSH2 0x12A JUMPI DUP1 PUSH4 0x6F8B65A4 EQ PUSH2 0x167 JUMPI DUP1 PUSH4 0x715018A6 EQ PUSH2 0x1A4 JUMPI DUP1 PUSH4 0x77F46763 EQ PUSH2 0x1BB JUMPI PUSH2 0xE5 JUMP JUMPDEST CALLDATASIZE PUSH2 0xE5 JUMPI CALLVALUE PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0xDD SWAP2 SWAP1 PUSH2 0xAF0 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE STOP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0xF6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x111 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x10C SWAP2 SWAP1 PUSH2 0xB87 JUMP JUMPDEST PUSH2 0x314 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x11F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x128 PUSH2 0x360 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x136 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x151 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x14C SWAP2 SWAP1 PUSH2 0xB87 JUMP JUMPDEST PUSH2 0x764 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x15E SWAP2 SWAP1 PUSH2 0xBC3 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x173 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x18E PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x189 SWAP2 SWAP1 PUSH2 0xB87 JUMP JUMPDEST PUSH2 0x809 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x19B SWAP2 SWAP1 PUSH2 0xBC3 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1B0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1B9 PUSH2 0x821 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1C7 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1E2 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x1DD SWAP2 SWAP1 PUSH2 0xB87 JUMP JUMPDEST PUSH2 0x835 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x1EF SWAP2 SWAP1 PUSH2 0xBC3 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x204 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x20D PUSH2 0x84D JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x21A SWAP2 SWAP1 PUSH2 0xBED JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x22F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x238 PUSH2 0x876 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x245 SWAP2 SWAP1 PUSH2 0xBC3 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x25A JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x275 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x270 SWAP2 SWAP1 PUSH2 0xB87 JUMP JUMPDEST PUSH2 0x87C JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x282 SWAP2 SWAP1 PUSH2 0xBC3 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x293 PUSH2 0x894 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2A1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x2AA PUSH2 0x8AF JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x2B7 SWAP2 SWAP1 PUSH2 0xBC3 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2CC JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x2E7 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x2E2 SWAP2 SWAP1 PUSH2 0xB87 JUMP JUMPDEST PUSH2 0x8B9 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2F5 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x2FE PUSH2 0x947 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x30B SWAP2 SWAP1 PUSH2 0xC67 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x31C PUSH2 0x96D JUMP JUMPDEST DUP1 PUSH1 0x1 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x70A08231 CALLER PUSH1 0x40 MLOAD DUP3 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x3BD SWAP2 SWAP1 PUSH2 0xBED JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x3DA JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x3FE SWAP2 SWAP1 PUSH2 0xCAE JUMP JUMPDEST GT PUSH2 0x43E JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x435 SWAP1 PUSH2 0xD5E JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x18160DDD PUSH1 0x40 MLOAD DUP2 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x4AD JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x4D1 SWAP2 SWAP1 PUSH2 0xCAE JUMP JUMPDEST PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x70A08231 CALLER PUSH1 0x40 MLOAD DUP3 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x52C SWAP2 SWAP1 PUSH2 0xBED JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x549 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x56D SWAP2 SWAP1 PUSH2 0xCAE JUMP JUMPDEST PUSH1 0x4 PUSH1 0x0 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH1 0x2 SLOAD PUSH2 0x5BA SWAP2 SWAP1 PUSH2 0xD7E JUMP JUMPDEST PUSH2 0x5C4 SWAP2 SWAP1 PUSH2 0xDB2 JUMP JUMPDEST PUSH2 0x5CE SWAP2 SWAP1 PUSH2 0xE23 JUMP JUMPDEST SWAP1 POP PUSH1 0x0 DUP2 GT PUSH2 0x613 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x60A SWAP1 PUSH2 0xEA0 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH2 0xD37A SWAP1 PUSH1 0x40 MLOAD PUSH2 0x63B SWAP1 PUSH2 0xEF1 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x679 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x67E JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP POP DUP1 PUSH1 0x5 PUSH1 0x0 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x6D0 SWAP2 SWAP1 PUSH2 0xAF0 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP PUSH1 0x2 SLOAD PUSH1 0x4 PUSH1 0x0 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP TIMESTAMP PUSH1 0x3 PUSH1 0x0 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x70A08231 DUP4 PUSH1 0x40 MLOAD DUP3 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x7C1 SWAP2 SWAP1 PUSH2 0xBED JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x7DE JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x802 SWAP2 SWAP1 PUSH2 0xCAE JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x3 PUSH1 0x20 MSTORE DUP1 PUSH1 0x0 MSTORE PUSH1 0x40 PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP2 POP SWAP1 POP SLOAD DUP2 JUMP JUMPDEST PUSH2 0x829 PUSH2 0x96D JUMP JUMPDEST PUSH2 0x833 PUSH1 0x0 PUSH2 0x9EB JUMP JUMPDEST JUMP JUMPDEST PUSH1 0x4 PUSH1 0x20 MSTORE DUP1 PUSH1 0x0 MSTORE PUSH1 0x40 PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP2 POP SWAP1 POP SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x2 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x5 PUSH1 0x20 MSTORE DUP1 PUSH1 0x0 MSTORE PUSH1 0x40 PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP2 POP SWAP1 POP SLOAD DUP2 JUMP JUMPDEST CALLVALUE PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x8A6 SWAP2 SWAP1 PUSH2 0xAF0 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH20 0x791F1CFB231E7C75EEE4B7F8913E3C2B3548EB93 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x93B JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x932 SWAP1 PUSH2 0xF52 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x944 DUP2 PUSH2 0x9EB JUMP JUMPDEST POP JUMP JUMPDEST PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP JUMPDEST PUSH2 0x975 PUSH2 0xAAF JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x993 PUSH2 0x84D JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x9E9 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x9E0 SWAP1 PUSH2 0xFBE JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP DUP2 PUSH1 0x0 DUP1 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 PUSH1 0x40 MLOAD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH1 0x0 CALLER SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 PUSH2 0xAFB DUP3 PUSH2 0xAB7 JUMP JUMPDEST SWAP2 POP PUSH2 0xB06 DUP4 PUSH2 0xAB7 JUMP JUMPDEST SWAP3 POP DUP3 DUP3 ADD SWAP1 POP DUP1 DUP3 GT ISZERO PUSH2 0xB1E JUMPI PUSH2 0xB1D PUSH2 0xAC1 JUMP JUMPDEST JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xB54 DUP3 PUSH2 0xB29 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0xB64 DUP2 PUSH2 0xB49 JUMP JUMPDEST DUP2 EQ PUSH2 0xB6F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0xB81 DUP2 PUSH2 0xB5B JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xB9D JUMPI PUSH2 0xB9C PUSH2 0xB24 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0xBAB DUP5 DUP3 DUP6 ADD PUSH2 0xB72 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0xBBD DUP2 PUSH2 0xAB7 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xBD8 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xBB4 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0xBE7 DUP2 PUSH2 0xB49 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xC02 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xBDE JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xC2D PUSH2 0xC28 PUSH2 0xC23 DUP5 PUSH2 0xB29 JUMP JUMPDEST PUSH2 0xC08 JUMP JUMPDEST PUSH2 0xB29 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xC3F DUP3 PUSH2 0xC12 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xC51 DUP3 PUSH2 0xC34 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0xC61 DUP2 PUSH2 0xC46 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xC7C PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xC58 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0xC8B DUP2 PUSH2 0xAB7 JUMP JUMPDEST DUP2 EQ PUSH2 0xC96 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP PUSH2 0xCA8 DUP2 PUSH2 0xC82 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xCC4 JUMPI PUSH2 0xCC3 PUSH2 0xB24 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0xCD2 DUP5 DUP3 DUP6 ADD PUSH2 0xC99 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x596F75206D75737420626520746865206F776E6572206F6620616E20746F6B65 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6E20746F20636C61696D2066756E64732E000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xD48 PUSH1 0x31 DUP4 PUSH2 0xCDB JUMP JUMPDEST SWAP2 POP PUSH2 0xD53 DUP3 PUSH2 0xCEC JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xD77 DUP2 PUSH2 0xD3B JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xD89 DUP3 PUSH2 0xAB7 JUMP JUMPDEST SWAP2 POP PUSH2 0xD94 DUP4 PUSH2 0xAB7 JUMP JUMPDEST SWAP3 POP DUP3 DUP3 SUB SWAP1 POP DUP2 DUP2 GT ISZERO PUSH2 0xDAC JUMPI PUSH2 0xDAB PUSH2 0xAC1 JUMP JUMPDEST JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xDBD DUP3 PUSH2 0xAB7 JUMP JUMPDEST SWAP2 POP PUSH2 0xDC8 DUP4 PUSH2 0xAB7 JUMP JUMPDEST SWAP3 POP DUP3 DUP3 MUL PUSH2 0xDD6 DUP2 PUSH2 0xAB7 JUMP JUMPDEST SWAP2 POP DUP3 DUP3 DIV DUP5 EQ DUP4 ISZERO OR PUSH2 0xDED JUMPI PUSH2 0xDEC PUSH2 0xAC1 JUMP JUMPDEST JUMPDEST POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x12 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 PUSH2 0xE2E DUP3 PUSH2 0xAB7 JUMP JUMPDEST SWAP2 POP PUSH2 0xE39 DUP4 PUSH2 0xAB7 JUMP JUMPDEST SWAP3 POP DUP3 PUSH2 0xE49 JUMPI PUSH2 0xE48 PUSH2 0xDF4 JUMP JUMPDEST JUMPDEST DUP3 DUP3 DIV SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x4E6F2066756E647320746F20636C61696D000000000000000000000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xE8A PUSH1 0x11 DUP4 PUSH2 0xCDB JUMP JUMPDEST SWAP2 POP PUSH2 0xE95 DUP3 PUSH2 0xE54 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xEB9 DUP2 PUSH2 0xE7D JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xEDB PUSH1 0x0 DUP4 PUSH2 0xEC0 JUMP JUMPDEST SWAP2 POP PUSH2 0xEE6 DUP3 PUSH2 0xECB JUMP JUMPDEST PUSH1 0x0 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xEFC DUP3 PUSH2 0xECE JUMP JUMPDEST SWAP2 POP DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x6E6F000000000000000000000000000000000000000000000000000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xF3C PUSH1 0x2 DUP4 PUSH2 0xCDB JUMP JUMPDEST SWAP2 POP PUSH2 0xF47 DUP3 PUSH2 0xF06 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xF6B DUP2 PUSH2 0xF2F JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4F776E61626C653A2063616C6C6572206973206E6F7420746865206F776E6572 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xFA8 PUSH1 0x20 DUP4 PUSH2 0xCDB JUMP JUMPDEST SWAP2 POP PUSH2 0xFB3 DUP3 PUSH2 0xF72 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xFD7 DUP2 PUSH2 0xF9B JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 SWAP5 0x26 0xC4 0xA9 GASPRICE PUSH31 0x3611C2BFE671F5A873D9B1713AF638B50934980AF8AE345EFB5364736F6C63 NUMBER STOP ADDMOD GT STOP CALLER ",
			"sourceMap": "352:2903:21:-:0;;;1139:20;;;;;;;;;;936:32:0;955:12;:10;;;:12;;:::i;:::-;936:18;;;:32;;:::i;:::-;352:2903:21;;640:96:11;693:7;719:10;712:17;;640:96;:::o;2433:187:0:-;2506:16;2525:6;;;;;;;;;;;2506:25;;2550:8;2541:6;;:17;;;;;;;;;;;;;;;;;;2604:8;2573:40;;2594:8;2573:40;;;;;;;;;;;;2496:124;2433:187;:::o;352:2903:21:-;;;;;;;"
		},
		"deployedBytecode": {
			"functionDebugData": {
				"@_4733": {
					"entryPoint": null,
					"id": 4733,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@_checkOwner_54": {
					"entryPoint": 2413,
					"id": 54,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@_msgSender_2419": {
					"entryPoint": 2735,
					"id": 2419,
					"parameterSlots": 0,
					"returnSlots": 1
				},
				"@_transferOwnership_111": {
					"entryPoint": 2539,
					"id": 111,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"@claimTimestamps_4679": {
					"entryPoint": 2057,
					"id": 4679,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@claim_4818": {
					"entryPoint": 864,
					"id": 4818,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@claims_4687": {
					"entryPoint": 2172,
					"id": 4687,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@deposit_4742": {
					"entryPoint": 2196,
					"id": 4742,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@getTotalFunds_4826": {
					"entryPoint": 2223,
					"id": 4826,
					"parameterSlots": 0,
					"returnSlots": 1
				},
				"@gettokenBalance_4839": {
					"entryPoint": 1892,
					"id": 4839,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"@lastMark_4683": {
					"entryPoint": 2101,
					"id": 4683,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@owner_40": {
					"entryPoint": 2125,
					"id": 40,
					"parameterSlots": 0,
					"returnSlots": 1
				},
				"@renounceOwnership_68": {
					"entryPoint": 2081,
					"id": 68,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@setTokenAddress_4705": {
					"entryPoint": 788,
					"id": 4705,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"@token_4664": {
					"entryPoint": 2375,
					"id": 4664,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@totalFunds_4675": {
					"entryPoint": 2166,
					"id": 4675,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"@transferOwnership_4724": {
					"entryPoint": 2233,
					"id": 4724,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"abi_decode_t_address": {
					"entryPoint": 2930,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_t_uint256_fromMemory": {
					"entryPoint": 3225,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_tuple_t_address": {
					"entryPoint": 2951,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_decode_tuple_t_uint256_fromMemory": {
					"entryPoint": 3246,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_encode_t_address_to_t_address_fromStack": {
					"entryPoint": 3038,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 0
				},
				"abi_encode_t_contract$_J3d_$4651_to_t_address_fromStack": {
					"entryPoint": 3160,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 0
				},
				"abi_encode_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d_to_t_string_memory_ptr_fromStack": {
					"entryPoint": 3709,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_t_stringliteral_139c47b7580e446b48d606a3f066f4bb9a530aea96c9ddc50ffded7b28813cfe_to_t_string_memory_ptr_fromStack": {
					"entryPoint": 3387,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba_to_t_string_memory_ptr_fromStack": {
					"entryPoint": 3887,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe_to_t_string_memory_ptr_fromStack": {
					"entryPoint": 3995,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470_to_t_bytes_memory_ptr_nonPadded_inplace_fromStack": {
					"entryPoint": 3790,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_t_uint256_to_t_uint256_fromStack": {
					"entryPoint": 2996,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 0
				},
				"abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed": {
					"entryPoint": 3825,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_address__to_t_address__fromStack_reversed": {
					"entryPoint": 3053,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_contract$_J3d_$4651__to_t_address__fromStack_reversed": {
					"entryPoint": 3175,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": 3744,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_stringliteral_139c47b7580e446b48d606a3f066f4bb9a530aea96c9ddc50ffded7b28813cfe__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": 3422,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": 3922,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe__to_t_string_memory_ptr__fromStack_reversed": {
					"entryPoint": 4030,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed": {
					"entryPoint": 3011,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"allocate_unbounded": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 1
				},
				"array_storeLengthForEncoding_t_bytes_memory_ptr_nonPadded_inplace_fromStack": {
					"entryPoint": 3776,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"array_storeLengthForEncoding_t_string_memory_ptr_fromStack": {
					"entryPoint": 3291,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"checked_add_t_uint256": {
					"entryPoint": 2800,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"checked_div_t_uint256": {
					"entryPoint": 3619,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"checked_mul_t_uint256": {
					"entryPoint": 3506,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"checked_sub_t_uint256": {
					"entryPoint": 3454,
					"id": null,
					"parameterSlots": 2,
					"returnSlots": 1
				},
				"cleanup_t_address": {
					"entryPoint": 2889,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"cleanup_t_uint160": {
					"entryPoint": 2857,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"cleanup_t_uint256": {
					"entryPoint": 2743,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"convert_t_contract$_J3d_$4651_to_t_address": {
					"entryPoint": 3142,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"convert_t_uint160_to_t_address": {
					"entryPoint": 3124,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"convert_t_uint160_to_t_uint160": {
					"entryPoint": 3090,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"identity": {
					"entryPoint": 3080,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 1
				},
				"panic_error_0x11": {
					"entryPoint": 2753,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"panic_error_0x12": {
					"entryPoint": 3572,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db": {
					"entryPoint": null,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b": {
					"entryPoint": 2852,
					"id": null,
					"parameterSlots": 0,
					"returnSlots": 0
				},
				"store_literal_in_memory_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d": {
					"entryPoint": 3668,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"store_literal_in_memory_139c47b7580e446b48d606a3f066f4bb9a530aea96c9ddc50ffded7b28813cfe": {
					"entryPoint": 3308,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"store_literal_in_memory_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba": {
					"entryPoint": 3846,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"store_literal_in_memory_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe": {
					"entryPoint": 3954,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"store_literal_in_memory_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470": {
					"entryPoint": 3787,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"validator_revert_t_address": {
					"entryPoint": 2907,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				},
				"validator_revert_t_uint256": {
					"entryPoint": 3202,
					"id": null,
					"parameterSlots": 1,
					"returnSlots": 0
				}
			},
			"generatedSources": [
				{
					"ast": {
						"nodeType": "YulBlock",
						"src": "0:10058:22",
						"statements": [
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "52:32:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "62:16:22",
											"value": {
												"name": "value",
												"nodeType": "YulIdentifier",
												"src": "73:5:22"
											},
											"variableNames": [
												{
													"name": "cleaned",
													"nodeType": "YulIdentifier",
													"src": "62:7:22"
												}
											]
										}
									]
								},
								"name": "cleanup_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "34:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "cleaned",
										"nodeType": "YulTypedName",
										"src": "44:7:22",
										"type": ""
									}
								],
								"src": "7:77:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "118:152:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "135:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "138:77:22",
														"type": "",
														"value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "128:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "128:88:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "128:88:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "232:1:22",
														"type": "",
														"value": "4"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "235:4:22",
														"type": "",
														"value": "0x11"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "225:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "225:15:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "225:15:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "256:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "259:4:22",
														"type": "",
														"value": "0x24"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "249:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "249:15:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "249:15:22"
										}
									]
								},
								"name": "panic_error_0x11",
								"nodeType": "YulFunctionDefinition",
								"src": "90:180:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "320:147:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "330:25:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "353:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "335:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "335:20:22"
											},
											"variableNames": [
												{
													"name": "x",
													"nodeType": "YulIdentifier",
													"src": "330:1:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "364:25:22",
											"value": {
												"arguments": [
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "387:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "369:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "369:20:22"
											},
											"variableNames": [
												{
													"name": "y",
													"nodeType": "YulIdentifier",
													"src": "364:1:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "398:16:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "409:1:22"
													},
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "412:1:22"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "405:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "405:9:22"
											},
											"variableNames": [
												{
													"name": "sum",
													"nodeType": "YulIdentifier",
													"src": "398:3:22"
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "438:22:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x11",
																"nodeType": "YulIdentifier",
																"src": "440:16:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "440:18:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "440:18:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "430:1:22"
													},
													{
														"name": "sum",
														"nodeType": "YulIdentifier",
														"src": "433:3:22"
													}
												],
												"functionName": {
													"name": "gt",
													"nodeType": "YulIdentifier",
													"src": "427:2:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "427:10:22"
											},
											"nodeType": "YulIf",
											"src": "424:36:22"
										}
									]
								},
								"name": "checked_add_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "x",
										"nodeType": "YulTypedName",
										"src": "307:1:22",
										"type": ""
									},
									{
										"name": "y",
										"nodeType": "YulTypedName",
										"src": "310:1:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "sum",
										"nodeType": "YulTypedName",
										"src": "316:3:22",
										"type": ""
									}
								],
								"src": "276:191:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "513:35:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "523:19:22",
											"value": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "539:2:22",
														"type": "",
														"value": "64"
													}
												],
												"functionName": {
													"name": "mload",
													"nodeType": "YulIdentifier",
													"src": "533:5:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "533:9:22"
											},
											"variableNames": [
												{
													"name": "memPtr",
													"nodeType": "YulIdentifier",
													"src": "523:6:22"
												}
											]
										}
									]
								},
								"name": "allocate_unbounded",
								"nodeType": "YulFunctionDefinition",
								"returnVariables": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "506:6:22",
										"type": ""
									}
								],
								"src": "473:75:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "643:28:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "660:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "663:1:22",
														"type": "",
														"value": "0"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "653:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "653:12:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "653:12:22"
										}
									]
								},
								"name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
								"nodeType": "YulFunctionDefinition",
								"src": "554:117:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "766:28:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "783:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "786:1:22",
														"type": "",
														"value": "0"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "776:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "776:12:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "776:12:22"
										}
									]
								},
								"name": "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db",
								"nodeType": "YulFunctionDefinition",
								"src": "677:117:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "845:81:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "855:65:22",
											"value": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "870:5:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "877:42:22",
														"type": "",
														"value": "0xffffffffffffffffffffffffffffffffffffffff"
													}
												],
												"functionName": {
													"name": "and",
													"nodeType": "YulIdentifier",
													"src": "866:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "866:54:22"
											},
											"variableNames": [
												{
													"name": "cleaned",
													"nodeType": "YulIdentifier",
													"src": "855:7:22"
												}
											]
										}
									]
								},
								"name": "cleanup_t_uint160",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "827:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "cleaned",
										"nodeType": "YulTypedName",
										"src": "837:7:22",
										"type": ""
									}
								],
								"src": "800:126:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "977:51:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "987:35:22",
											"value": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "1016:5:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint160",
													"nodeType": "YulIdentifier",
													"src": "998:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "998:24:22"
											},
											"variableNames": [
												{
													"name": "cleaned",
													"nodeType": "YulIdentifier",
													"src": "987:7:22"
												}
											]
										}
									]
								},
								"name": "cleanup_t_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "959:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "cleaned",
										"nodeType": "YulTypedName",
										"src": "969:7:22",
										"type": ""
									}
								],
								"src": "932:96:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1077:79:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "1134:16:22",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "1143:1:22",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "1146:1:22",
																	"type": "",
																	"value": "0"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "1136:6:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "1136:12:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "1136:12:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "1100:5:22"
															},
															{
																"arguments": [
																	{
																		"name": "value",
																		"nodeType": "YulIdentifier",
																		"src": "1125:5:22"
																	}
																],
																"functionName": {
																	"name": "cleanup_t_address",
																	"nodeType": "YulIdentifier",
																	"src": "1107:17:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "1107:24:22"
															}
														],
														"functionName": {
															"name": "eq",
															"nodeType": "YulIdentifier",
															"src": "1097:2:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "1097:35:22"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "1090:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "1090:43:22"
											},
											"nodeType": "YulIf",
											"src": "1087:63:22"
										}
									]
								},
								"name": "validator_revert_t_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "1070:5:22",
										"type": ""
									}
								],
								"src": "1034:122:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1214:87:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "1224:29:22",
											"value": {
												"arguments": [
													{
														"name": "offset",
														"nodeType": "YulIdentifier",
														"src": "1246:6:22"
													}
												],
												"functionName": {
													"name": "calldataload",
													"nodeType": "YulIdentifier",
													"src": "1233:12:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "1233:20:22"
											},
											"variableNames": [
												{
													"name": "value",
													"nodeType": "YulIdentifier",
													"src": "1224:5:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "1289:5:22"
													}
												],
												"functionName": {
													"name": "validator_revert_t_address",
													"nodeType": "YulIdentifier",
													"src": "1262:26:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "1262:33:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "1262:33:22"
										}
									]
								},
								"name": "abi_decode_t_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "offset",
										"nodeType": "YulTypedName",
										"src": "1192:6:22",
										"type": ""
									},
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "1200:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "1208:5:22",
										"type": ""
									}
								],
								"src": "1162:139:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1373:263:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "1419:83:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
																"nodeType": "YulIdentifier",
																"src": "1421:77:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "1421:79:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "1421:79:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "1394:7:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "1403:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "1390:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "1390:23:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1415:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "slt",
													"nodeType": "YulIdentifier",
													"src": "1386:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "1386:32:22"
											},
											"nodeType": "YulIf",
											"src": "1383:119:22"
										},
										{
											"nodeType": "YulBlock",
											"src": "1512:117:22",
											"statements": [
												{
													"nodeType": "YulVariableDeclaration",
													"src": "1527:15:22",
													"value": {
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1541:1:22",
														"type": "",
														"value": "0"
													},
													"variables": [
														{
															"name": "offset",
															"nodeType": "YulTypedName",
															"src": "1531:6:22",
															"type": ""
														}
													]
												},
												{
													"nodeType": "YulAssignment",
													"src": "1556:63:22",
													"value": {
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "headStart",
																		"nodeType": "YulIdentifier",
																		"src": "1591:9:22"
																	},
																	{
																		"name": "offset",
																		"nodeType": "YulIdentifier",
																		"src": "1602:6:22"
																	}
																],
																"functionName": {
																	"name": "add",
																	"nodeType": "YulIdentifier",
																	"src": "1587:3:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "1587:22:22"
															},
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "1611:7:22"
															}
														],
														"functionName": {
															"name": "abi_decode_t_address",
															"nodeType": "YulIdentifier",
															"src": "1566:20:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "1566:53:22"
													},
													"variableNames": [
														{
															"name": "value0",
															"nodeType": "YulIdentifier",
															"src": "1556:6:22"
														}
													]
												}
											]
										}
									]
								},
								"name": "abi_decode_tuple_t_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "1343:9:22",
										"type": ""
									},
									{
										"name": "dataEnd",
										"nodeType": "YulTypedName",
										"src": "1354:7:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "1366:6:22",
										"type": ""
									}
								],
								"src": "1307:329:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1707:53:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "1724:3:22"
													},
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "1747:5:22"
															}
														],
														"functionName": {
															"name": "cleanup_t_uint256",
															"nodeType": "YulIdentifier",
															"src": "1729:17:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "1729:24:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "1717:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "1717:37:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "1717:37:22"
										}
									]
								},
								"name": "abi_encode_t_uint256_to_t_uint256_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "1695:5:22",
										"type": ""
									},
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "1702:3:22",
										"type": ""
									}
								],
								"src": "1642:118:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "1864:124:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "1874:26:22",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "1886:9:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "1897:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "1882:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "1882:18:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "1874:4:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "value0",
														"nodeType": "YulIdentifier",
														"src": "1954:6:22"
													},
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "1967:9:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "1978:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "1963:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "1963:17:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_uint256_to_t_uint256_fromStack",
													"nodeType": "YulIdentifier",
													"src": "1910:43:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "1910:71:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "1910:71:22"
										}
									]
								},
								"name": "abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "1836:9:22",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "1848:6:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "1859:4:22",
										"type": ""
									}
								],
								"src": "1766:222:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2059:53:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "2076:3:22"
													},
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "2099:5:22"
															}
														],
														"functionName": {
															"name": "cleanup_t_address",
															"nodeType": "YulIdentifier",
															"src": "2081:17:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "2081:24:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "2069:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "2069:37:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "2069:37:22"
										}
									]
								},
								"name": "abi_encode_t_address_to_t_address_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "2047:5:22",
										"type": ""
									},
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "2054:3:22",
										"type": ""
									}
								],
								"src": "1994:118:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2216:124:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "2226:26:22",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "2238:9:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "2249:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "2234:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "2234:18:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "2226:4:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "value0",
														"nodeType": "YulIdentifier",
														"src": "2306:6:22"
													},
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "2319:9:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "2330:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "2315:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "2315:17:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_address_to_t_address_fromStack",
													"nodeType": "YulIdentifier",
													"src": "2262:43:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "2262:71:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "2262:71:22"
										}
									]
								},
								"name": "abi_encode_tuple_t_address__to_t_address__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "2188:9:22",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "2200:6:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "2211:4:22",
										"type": ""
									}
								],
								"src": "2118:222:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2378:28:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "2388:12:22",
											"value": {
												"name": "value",
												"nodeType": "YulIdentifier",
												"src": "2395:5:22"
											},
											"variableNames": [
												{
													"name": "ret",
													"nodeType": "YulIdentifier",
													"src": "2388:3:22"
												}
											]
										}
									]
								},
								"name": "identity",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "2364:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "ret",
										"nodeType": "YulTypedName",
										"src": "2374:3:22",
										"type": ""
									}
								],
								"src": "2346:60:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2472:82:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "2482:66:22",
											"value": {
												"arguments": [
													{
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "value",
																		"nodeType": "YulIdentifier",
																		"src": "2540:5:22"
																	}
																],
																"functionName": {
																	"name": "cleanup_t_uint160",
																	"nodeType": "YulIdentifier",
																	"src": "2522:17:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "2522:24:22"
															}
														],
														"functionName": {
															"name": "identity",
															"nodeType": "YulIdentifier",
															"src": "2513:8:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "2513:34:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint160",
													"nodeType": "YulIdentifier",
													"src": "2495:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "2495:53:22"
											},
											"variableNames": [
												{
													"name": "converted",
													"nodeType": "YulIdentifier",
													"src": "2482:9:22"
												}
											]
										}
									]
								},
								"name": "convert_t_uint160_to_t_uint160",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "2452:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "converted",
										"nodeType": "YulTypedName",
										"src": "2462:9:22",
										"type": ""
									}
								],
								"src": "2412:142:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2620:66:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "2630:50:22",
											"value": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "2674:5:22"
													}
												],
												"functionName": {
													"name": "convert_t_uint160_to_t_uint160",
													"nodeType": "YulIdentifier",
													"src": "2643:30:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "2643:37:22"
											},
											"variableNames": [
												{
													"name": "converted",
													"nodeType": "YulIdentifier",
													"src": "2630:9:22"
												}
											]
										}
									]
								},
								"name": "convert_t_uint160_to_t_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "2600:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "converted",
										"nodeType": "YulTypedName",
										"src": "2610:9:22",
										"type": ""
									}
								],
								"src": "2560:126:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2764:66:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "2774:50:22",
											"value": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "2818:5:22"
													}
												],
												"functionName": {
													"name": "convert_t_uint160_to_t_address",
													"nodeType": "YulIdentifier",
													"src": "2787:30:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "2787:37:22"
											},
											"variableNames": [
												{
													"name": "converted",
													"nodeType": "YulIdentifier",
													"src": "2774:9:22"
												}
											]
										}
									]
								},
								"name": "convert_t_contract$_J3d_$4651_to_t_address",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "2744:5:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "converted",
										"nodeType": "YulTypedName",
										"src": "2754:9:22",
										"type": ""
									}
								],
								"src": "2692:138:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "2913:78:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "2930:3:22"
													},
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "2978:5:22"
															}
														],
														"functionName": {
															"name": "convert_t_contract$_J3d_$4651_to_t_address",
															"nodeType": "YulIdentifier",
															"src": "2935:42:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "2935:49:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "2923:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "2923:62:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "2923:62:22"
										}
									]
								},
								"name": "abi_encode_t_contract$_J3d_$4651_to_t_address_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "2901:5:22",
										"type": ""
									},
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "2908:3:22",
										"type": ""
									}
								],
								"src": "2836:155:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "3107:136:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "3117:26:22",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "3129:9:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3140:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "3125:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3125:18:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "3117:4:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "value0",
														"nodeType": "YulIdentifier",
														"src": "3209:6:22"
													},
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "3222:9:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "3233:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "3218:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "3218:17:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_contract$_J3d_$4651_to_t_address_fromStack",
													"nodeType": "YulIdentifier",
													"src": "3153:55:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3153:83:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "3153:83:22"
										}
									]
								},
								"name": "abi_encode_tuple_t_contract$_J3d_$4651__to_t_address__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "3079:9:22",
										"type": ""
									},
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "3091:6:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "3102:4:22",
										"type": ""
									}
								],
								"src": "2997:246:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "3292:79:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "3349:16:22",
												"statements": [
													{
														"expression": {
															"arguments": [
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "3358:1:22",
																	"type": "",
																	"value": "0"
																},
																{
																	"kind": "number",
																	"nodeType": "YulLiteral",
																	"src": "3361:1:22",
																	"type": "",
																	"value": "0"
																}
															],
															"functionName": {
																"name": "revert",
																"nodeType": "YulIdentifier",
																"src": "3351:6:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "3351:12:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "3351:12:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "value",
																"nodeType": "YulIdentifier",
																"src": "3315:5:22"
															},
															{
																"arguments": [
																	{
																		"name": "value",
																		"nodeType": "YulIdentifier",
																		"src": "3340:5:22"
																	}
																],
																"functionName": {
																	"name": "cleanup_t_uint256",
																	"nodeType": "YulIdentifier",
																	"src": "3322:17:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "3322:24:22"
															}
														],
														"functionName": {
															"name": "eq",
															"nodeType": "YulIdentifier",
															"src": "3312:2:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "3312:35:22"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "3305:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3305:43:22"
											},
											"nodeType": "YulIf",
											"src": "3302:63:22"
										}
									]
								},
								"name": "validator_revert_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "3285:5:22",
										"type": ""
									}
								],
								"src": "3249:122:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "3440:80:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "3450:22:22",
											"value": {
												"arguments": [
													{
														"name": "offset",
														"nodeType": "YulIdentifier",
														"src": "3465:6:22"
													}
												],
												"functionName": {
													"name": "mload",
													"nodeType": "YulIdentifier",
													"src": "3459:5:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3459:13:22"
											},
											"variableNames": [
												{
													"name": "value",
													"nodeType": "YulIdentifier",
													"src": "3450:5:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "value",
														"nodeType": "YulIdentifier",
														"src": "3508:5:22"
													}
												],
												"functionName": {
													"name": "validator_revert_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "3481:26:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3481:33:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "3481:33:22"
										}
									]
								},
								"name": "abi_decode_t_uint256_fromMemory",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "offset",
										"nodeType": "YulTypedName",
										"src": "3418:6:22",
										"type": ""
									},
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "3426:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value",
										"nodeType": "YulTypedName",
										"src": "3434:5:22",
										"type": ""
									}
								],
								"src": "3377:143:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "3603:274:22",
									"statements": [
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "3649:83:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
																"nodeType": "YulIdentifier",
																"src": "3651:77:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "3651:79:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "3651:79:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "3624:7:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "3633:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "3620:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "3620:23:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3645:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "slt",
													"nodeType": "YulIdentifier",
													"src": "3616:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3616:32:22"
											},
											"nodeType": "YulIf",
											"src": "3613:119:22"
										},
										{
											"nodeType": "YulBlock",
											"src": "3742:128:22",
											"statements": [
												{
													"nodeType": "YulVariableDeclaration",
													"src": "3757:15:22",
													"value": {
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "3771:1:22",
														"type": "",
														"value": "0"
													},
													"variables": [
														{
															"name": "offset",
															"nodeType": "YulTypedName",
															"src": "3761:6:22",
															"type": ""
														}
													]
												},
												{
													"nodeType": "YulAssignment",
													"src": "3786:74:22",
													"value": {
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "headStart",
																		"nodeType": "YulIdentifier",
																		"src": "3832:9:22"
																	},
																	{
																		"name": "offset",
																		"nodeType": "YulIdentifier",
																		"src": "3843:6:22"
																	}
																],
																"functionName": {
																	"name": "add",
																	"nodeType": "YulIdentifier",
																	"src": "3828:3:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "3828:22:22"
															},
															{
																"name": "dataEnd",
																"nodeType": "YulIdentifier",
																"src": "3852:7:22"
															}
														],
														"functionName": {
															"name": "abi_decode_t_uint256_fromMemory",
															"nodeType": "YulIdentifier",
															"src": "3796:31:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "3796:64:22"
													},
													"variableNames": [
														{
															"name": "value0",
															"nodeType": "YulIdentifier",
															"src": "3786:6:22"
														}
													]
												}
											]
										}
									]
								},
								"name": "abi_decode_tuple_t_uint256_fromMemory",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "3573:9:22",
										"type": ""
									},
									{
										"name": "dataEnd",
										"nodeType": "YulTypedName",
										"src": "3584:7:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "value0",
										"nodeType": "YulTypedName",
										"src": "3596:6:22",
										"type": ""
									}
								],
								"src": "3526:351:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "3979:73:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "3996:3:22"
													},
													{
														"name": "length",
														"nodeType": "YulIdentifier",
														"src": "4001:6:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "3989:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "3989:19:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "3989:19:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "4017:29:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "4036:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4041:4:22",
														"type": "",
														"value": "0x20"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "4032:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4032:14:22"
											},
											"variableNames": [
												{
													"name": "updated_pos",
													"nodeType": "YulIdentifier",
													"src": "4017:11:22"
												}
											]
										}
									]
								},
								"name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "3951:3:22",
										"type": ""
									},
									{
										"name": "length",
										"nodeType": "YulTypedName",
										"src": "3956:6:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "updated_pos",
										"nodeType": "YulTypedName",
										"src": "3967:11:22",
										"type": ""
									}
								],
								"src": "3883:169:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "4164:130:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "memPtr",
																"nodeType": "YulIdentifier",
																"src": "4186:6:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "4194:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "4182:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "4182:14:22"
													},
													{
														"hexValue": "596f75206d75737420626520746865206f776e6572206f6620616e20746f6b65",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "4198:34:22",
														"type": "",
														"value": "You must be the owner of an toke"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "4175:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4175:58:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4175:58:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "memPtr",
																"nodeType": "YulIdentifier",
																"src": "4254:6:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "4262:2:22",
																"type": "",
																"value": "32"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "4250:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "4250:15:22"
													},
													{
														"hexValue": "6e20746f20636c61696d2066756e64732e",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "4267:19:22",
														"type": "",
														"value": "n to claim funds."
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "4243:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4243:44:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4243:44:22"
										}
									]
								},
								"name": "store_literal_in_memory_139c47b7580e446b48d606a3f066f4bb9a530aea96c9ddc50ffded7b28813cfe",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "4156:6:22",
										"type": ""
									}
								],
								"src": "4058:236:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "4446:220:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "4456:74:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "4522:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4527:2:22",
														"type": "",
														"value": "49"
													}
												],
												"functionName": {
													"name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "4463:58:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4463:67:22"
											},
											"variableNames": [
												{
													"name": "pos",
													"nodeType": "YulIdentifier",
													"src": "4456:3:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "4628:3:22"
													}
												],
												"functionName": {
													"name": "store_literal_in_memory_139c47b7580e446b48d606a3f066f4bb9a530aea96c9ddc50ffded7b28813cfe",
													"nodeType": "YulIdentifier",
													"src": "4539:88:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4539:93:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4539:93:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "4641:19:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "4652:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4657:2:22",
														"type": "",
														"value": "64"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "4648:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4648:12:22"
											},
											"variableNames": [
												{
													"name": "end",
													"nodeType": "YulIdentifier",
													"src": "4641:3:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_t_stringliteral_139c47b7580e446b48d606a3f066f4bb9a530aea96c9ddc50ffded7b28813cfe_to_t_string_memory_ptr_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "4434:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "4442:3:22",
										"type": ""
									}
								],
								"src": "4300:366:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "4843:248:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "4853:26:22",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "4865:9:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "4876:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "4861:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4861:18:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "4853:4:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "4900:9:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "4911:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "4896:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "4896:17:22"
													},
													{
														"arguments": [
															{
																"name": "tail",
																"nodeType": "YulIdentifier",
																"src": "4919:4:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "4925:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "4915:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "4915:20:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "4889:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4889:47:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "4889:47:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "4945:139:22",
											"value": {
												"arguments": [
													{
														"name": "tail",
														"nodeType": "YulIdentifier",
														"src": "5079:4:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_stringliteral_139c47b7580e446b48d606a3f066f4bb9a530aea96c9ddc50ffded7b28813cfe_to_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "4953:124:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "4953:131:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "4945:4:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_stringliteral_139c47b7580e446b48d606a3f066f4bb9a530aea96c9ddc50ffded7b28813cfe__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "4823:9:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "4838:4:22",
										"type": ""
									}
								],
								"src": "4672:419:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "5142:149:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "5152:25:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "5175:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "5157:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5157:20:22"
											},
											"variableNames": [
												{
													"name": "x",
													"nodeType": "YulIdentifier",
													"src": "5152:1:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "5186:25:22",
											"value": {
												"arguments": [
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "5209:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "5191:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5191:20:22"
											},
											"variableNames": [
												{
													"name": "y",
													"nodeType": "YulIdentifier",
													"src": "5186:1:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "5220:17:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "5232:1:22"
													},
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "5235:1:22"
													}
												],
												"functionName": {
													"name": "sub",
													"nodeType": "YulIdentifier",
													"src": "5228:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5228:9:22"
											},
											"variableNames": [
												{
													"name": "diff",
													"nodeType": "YulIdentifier",
													"src": "5220:4:22"
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "5262:22:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x11",
																"nodeType": "YulIdentifier",
																"src": "5264:16:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "5264:18:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "5264:18:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "diff",
														"nodeType": "YulIdentifier",
														"src": "5253:4:22"
													},
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "5259:1:22"
													}
												],
												"functionName": {
													"name": "gt",
													"nodeType": "YulIdentifier",
													"src": "5250:2:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5250:11:22"
											},
											"nodeType": "YulIf",
											"src": "5247:37:22"
										}
									]
								},
								"name": "checked_sub_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "x",
										"nodeType": "YulTypedName",
										"src": "5128:1:22",
										"type": ""
									},
									{
										"name": "y",
										"nodeType": "YulTypedName",
										"src": "5131:1:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "diff",
										"nodeType": "YulTypedName",
										"src": "5137:4:22",
										"type": ""
									}
								],
								"src": "5097:194:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "5345:362:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "5355:25:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "5378:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "5360:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5360:20:22"
											},
											"variableNames": [
												{
													"name": "x",
													"nodeType": "YulIdentifier",
													"src": "5355:1:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "5389:25:22",
											"value": {
												"arguments": [
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "5412:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "5394:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5394:20:22"
											},
											"variableNames": [
												{
													"name": "y",
													"nodeType": "YulIdentifier",
													"src": "5389:1:22"
												}
											]
										},
										{
											"nodeType": "YulVariableDeclaration",
											"src": "5423:28:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "5446:1:22"
													},
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "5449:1:22"
													}
												],
												"functionName": {
													"name": "mul",
													"nodeType": "YulIdentifier",
													"src": "5442:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5442:9:22"
											},
											"variables": [
												{
													"name": "product_raw",
													"nodeType": "YulTypedName",
													"src": "5427:11:22",
													"type": ""
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "5460:41:22",
											"value": {
												"arguments": [
													{
														"name": "product_raw",
														"nodeType": "YulIdentifier",
														"src": "5489:11:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "5471:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5471:30:22"
											},
											"variableNames": [
												{
													"name": "product",
													"nodeType": "YulIdentifier",
													"src": "5460:7:22"
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "5678:22:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x11",
																"nodeType": "YulIdentifier",
																"src": "5680:16:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "5680:18:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "5680:18:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"arguments": [
															{
																"arguments": [
																	{
																		"name": "x",
																		"nodeType": "YulIdentifier",
																		"src": "5611:1:22"
																	}
																],
																"functionName": {
																	"name": "iszero",
																	"nodeType": "YulIdentifier",
																	"src": "5604:6:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "5604:9:22"
															},
															{
																"arguments": [
																	{
																		"name": "y",
																		"nodeType": "YulIdentifier",
																		"src": "5634:1:22"
																	},
																	{
																		"arguments": [
																			{
																				"name": "product",
																				"nodeType": "YulIdentifier",
																				"src": "5641:7:22"
																			},
																			{
																				"name": "x",
																				"nodeType": "YulIdentifier",
																				"src": "5650:1:22"
																			}
																		],
																		"functionName": {
																			"name": "div",
																			"nodeType": "YulIdentifier",
																			"src": "5637:3:22"
																		},
																		"nodeType": "YulFunctionCall",
																		"src": "5637:15:22"
																	}
																],
																"functionName": {
																	"name": "eq",
																	"nodeType": "YulIdentifier",
																	"src": "5631:2:22"
																},
																"nodeType": "YulFunctionCall",
																"src": "5631:22:22"
															}
														],
														"functionName": {
															"name": "or",
															"nodeType": "YulIdentifier",
															"src": "5584:2:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "5584:83:22"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "5564:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5564:113:22"
											},
											"nodeType": "YulIf",
											"src": "5561:139:22"
										}
									]
								},
								"name": "checked_mul_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "x",
										"nodeType": "YulTypedName",
										"src": "5328:1:22",
										"type": ""
									},
									{
										"name": "y",
										"nodeType": "YulTypedName",
										"src": "5331:1:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "product",
										"nodeType": "YulTypedName",
										"src": "5337:7:22",
										"type": ""
									}
								],
								"src": "5297:410:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "5741:152:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "5758:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "5761:77:22",
														"type": "",
														"value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "5751:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5751:88:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "5751:88:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "5855:1:22",
														"type": "",
														"value": "4"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "5858:4:22",
														"type": "",
														"value": "0x12"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "5848:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5848:15:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "5848:15:22"
										},
										{
											"expression": {
												"arguments": [
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "5879:1:22",
														"type": "",
														"value": "0"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "5882:4:22",
														"type": "",
														"value": "0x24"
													}
												],
												"functionName": {
													"name": "revert",
													"nodeType": "YulIdentifier",
													"src": "5872:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5872:15:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "5872:15:22"
										}
									]
								},
								"name": "panic_error_0x12",
								"nodeType": "YulFunctionDefinition",
								"src": "5713:180:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "5941:143:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "5951:25:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "5974:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "5956:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5956:20:22"
											},
											"variableNames": [
												{
													"name": "x",
													"nodeType": "YulIdentifier",
													"src": "5951:1:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "5985:25:22",
											"value": {
												"arguments": [
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "6008:1:22"
													}
												],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "5990:17:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "5990:20:22"
											},
											"variableNames": [
												{
													"name": "y",
													"nodeType": "YulIdentifier",
													"src": "5985:1:22"
												}
											]
										},
										{
											"body": {
												"nodeType": "YulBlock",
												"src": "6032:22:22",
												"statements": [
													{
														"expression": {
															"arguments": [],
															"functionName": {
																"name": "panic_error_0x12",
																"nodeType": "YulIdentifier",
																"src": "6034:16:22"
															},
															"nodeType": "YulFunctionCall",
															"src": "6034:18:22"
														},
														"nodeType": "YulExpressionStatement",
														"src": "6034:18:22"
													}
												]
											},
											"condition": {
												"arguments": [
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "6029:1:22"
													}
												],
												"functionName": {
													"name": "iszero",
													"nodeType": "YulIdentifier",
													"src": "6022:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6022:9:22"
											},
											"nodeType": "YulIf",
											"src": "6019:35:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "6064:14:22",
											"value": {
												"arguments": [
													{
														"name": "x",
														"nodeType": "YulIdentifier",
														"src": "6073:1:22"
													},
													{
														"name": "y",
														"nodeType": "YulIdentifier",
														"src": "6076:1:22"
													}
												],
												"functionName": {
													"name": "div",
													"nodeType": "YulIdentifier",
													"src": "6069:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6069:9:22"
											},
											"variableNames": [
												{
													"name": "r",
													"nodeType": "YulIdentifier",
													"src": "6064:1:22"
												}
											]
										}
									]
								},
								"name": "checked_div_t_uint256",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "x",
										"nodeType": "YulTypedName",
										"src": "5930:1:22",
										"type": ""
									},
									{
										"name": "y",
										"nodeType": "YulTypedName",
										"src": "5933:1:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "r",
										"nodeType": "YulTypedName",
										"src": "5939:1:22",
										"type": ""
									}
								],
								"src": "5899:185:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "6196:61:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "memPtr",
																"nodeType": "YulIdentifier",
																"src": "6218:6:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "6226:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "6214:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "6214:14:22"
													},
													{
														"hexValue": "4e6f2066756e647320746f20636c61696d",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "6230:19:22",
														"type": "",
														"value": "No funds to claim"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "6207:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6207:43:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "6207:43:22"
										}
									]
								},
								"name": "store_literal_in_memory_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "6188:6:22",
										"type": ""
									}
								],
								"src": "6090:167:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "6409:220:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "6419:74:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "6485:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6490:2:22",
														"type": "",
														"value": "17"
													}
												],
												"functionName": {
													"name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "6426:58:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6426:67:22"
											},
											"variableNames": [
												{
													"name": "pos",
													"nodeType": "YulIdentifier",
													"src": "6419:3:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "6591:3:22"
													}
												],
												"functionName": {
													"name": "store_literal_in_memory_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d",
													"nodeType": "YulIdentifier",
													"src": "6502:88:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6502:93:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "6502:93:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "6604:19:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "6615:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6620:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "6611:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6611:12:22"
											},
											"variableNames": [
												{
													"name": "end",
													"nodeType": "YulIdentifier",
													"src": "6604:3:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d_to_t_string_memory_ptr_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "6397:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "6405:3:22",
										"type": ""
									}
								],
								"src": "6263:366:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "6806:248:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "6816:26:22",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "6828:9:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "6839:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "6824:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6824:18:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "6816:4:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "6863:9:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "6874:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "6859:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "6859:17:22"
													},
													{
														"arguments": [
															{
																"name": "tail",
																"nodeType": "YulIdentifier",
																"src": "6882:4:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "6888:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "6878:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "6878:20:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "6852:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6852:47:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "6852:47:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "6908:139:22",
											"value": {
												"arguments": [
													{
														"name": "tail",
														"nodeType": "YulIdentifier",
														"src": "7042:4:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d_to_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "6916:124:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "6916:131:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "6908:4:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "6786:9:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "6801:4:22",
										"type": ""
									}
								],
								"src": "6635:419:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "7173:34:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "7183:18:22",
											"value": {
												"name": "pos",
												"nodeType": "YulIdentifier",
												"src": "7198:3:22"
											},
											"variableNames": [
												{
													"name": "updated_pos",
													"nodeType": "YulIdentifier",
													"src": "7183:11:22"
												}
											]
										}
									]
								},
								"name": "array_storeLengthForEncoding_t_bytes_memory_ptr_nonPadded_inplace_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "7145:3:22",
										"type": ""
									},
									{
										"name": "length",
										"nodeType": "YulTypedName",
										"src": "7150:6:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "updated_pos",
										"nodeType": "YulTypedName",
										"src": "7161:11:22",
										"type": ""
									}
								],
								"src": "7060:147:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "7319:8:22",
									"statements": []
								},
								"name": "store_literal_in_memory_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "7311:6:22",
										"type": ""
									}
								],
								"src": "7213:114:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "7496:235:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "7506:90:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "7589:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "7594:1:22",
														"type": "",
														"value": "0"
													}
												],
												"functionName": {
													"name": "array_storeLengthForEncoding_t_bytes_memory_ptr_nonPadded_inplace_fromStack",
													"nodeType": "YulIdentifier",
													"src": "7513:75:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "7513:83:22"
											},
											"variableNames": [
												{
													"name": "pos",
													"nodeType": "YulIdentifier",
													"src": "7506:3:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "7694:3:22"
													}
												],
												"functionName": {
													"name": "store_literal_in_memory_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
													"nodeType": "YulIdentifier",
													"src": "7605:88:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "7605:93:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "7605:93:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "7707:18:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "7718:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "7723:1:22",
														"type": "",
														"value": "0"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "7714:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "7714:11:22"
											},
											"variableNames": [
												{
													"name": "end",
													"nodeType": "YulIdentifier",
													"src": "7707:3:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470_to_t_bytes_memory_ptr_nonPadded_inplace_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "7484:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "7492:3:22",
										"type": ""
									}
								],
								"src": "7333:398:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "7925:191:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "7936:154:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "8086:3:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470_to_t_bytes_memory_ptr_nonPadded_inplace_fromStack",
													"nodeType": "YulIdentifier",
													"src": "7943:141:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "7943:147:22"
											},
											"variableNames": [
												{
													"name": "pos",
													"nodeType": "YulIdentifier",
													"src": "7936:3:22"
												}
											]
										},
										{
											"nodeType": "YulAssignment",
											"src": "8100:10:22",
											"value": {
												"name": "pos",
												"nodeType": "YulIdentifier",
												"src": "8107:3:22"
											},
											"variableNames": [
												{
													"name": "end",
													"nodeType": "YulIdentifier",
													"src": "8100:3:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "7912:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "7921:3:22",
										"type": ""
									}
								],
								"src": "7737:379:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "8228:46:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "memPtr",
																"nodeType": "YulIdentifier",
																"src": "8250:6:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "8258:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "8246:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "8246:14:22"
													},
													{
														"hexValue": "6e6f",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "8262:4:22",
														"type": "",
														"value": "no"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "8239:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8239:28:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "8239:28:22"
										}
									]
								},
								"name": "store_literal_in_memory_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "8220:6:22",
										"type": ""
									}
								],
								"src": "8122:152:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "8426:219:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "8436:73:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "8502:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "8507:1:22",
														"type": "",
														"value": "2"
													}
												],
												"functionName": {
													"name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "8443:58:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8443:66:22"
											},
											"variableNames": [
												{
													"name": "pos",
													"nodeType": "YulIdentifier",
													"src": "8436:3:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "8607:3:22"
													}
												],
												"functionName": {
													"name": "store_literal_in_memory_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba",
													"nodeType": "YulIdentifier",
													"src": "8518:88:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8518:93:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "8518:93:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "8620:19:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "8631:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "8636:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "8627:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8627:12:22"
											},
											"variableNames": [
												{
													"name": "end",
													"nodeType": "YulIdentifier",
													"src": "8620:3:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba_to_t_string_memory_ptr_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "8414:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "8422:3:22",
										"type": ""
									}
								],
								"src": "8280:365:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "8822:248:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "8832:26:22",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "8844:9:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "8855:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "8840:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8840:18:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "8832:4:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "8879:9:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "8890:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "8875:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "8875:17:22"
													},
													{
														"arguments": [
															{
																"name": "tail",
																"nodeType": "YulIdentifier",
																"src": "8898:4:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "8904:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "8894:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "8894:20:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "8868:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8868:47:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "8868:47:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "8924:139:22",
											"value": {
												"arguments": [
													{
														"name": "tail",
														"nodeType": "YulIdentifier",
														"src": "9058:4:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba_to_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "8932:124:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "8932:131:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "8924:4:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "8802:9:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "8817:4:22",
										"type": ""
									}
								],
								"src": "8651:419:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "9182:76:22",
									"statements": [
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "memPtr",
																"nodeType": "YulIdentifier",
																"src": "9204:6:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "9212:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "9200:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "9200:14:22"
													},
													{
														"hexValue": "4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572",
														"kind": "string",
														"nodeType": "YulLiteral",
														"src": "9216:34:22",
														"type": "",
														"value": "Ownable: caller is not the owner"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "9193:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9193:58:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "9193:58:22"
										}
									]
								},
								"name": "store_literal_in_memory_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "memPtr",
										"nodeType": "YulTypedName",
										"src": "9174:6:22",
										"type": ""
									}
								],
								"src": "9076:182:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "9410:220:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "9420:74:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "9486:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "9491:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "9427:58:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9427:67:22"
											},
											"variableNames": [
												{
													"name": "pos",
													"nodeType": "YulIdentifier",
													"src": "9420:3:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "9592:3:22"
													}
												],
												"functionName": {
													"name": "store_literal_in_memory_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe",
													"nodeType": "YulIdentifier",
													"src": "9503:88:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9503:93:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "9503:93:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "9605:19:22",
											"value": {
												"arguments": [
													{
														"name": "pos",
														"nodeType": "YulIdentifier",
														"src": "9616:3:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "9621:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "9612:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9612:12:22"
											},
											"variableNames": [
												{
													"name": "end",
													"nodeType": "YulIdentifier",
													"src": "9605:3:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe_to_t_string_memory_ptr_fromStack",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "pos",
										"nodeType": "YulTypedName",
										"src": "9398:3:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "end",
										"nodeType": "YulTypedName",
										"src": "9406:3:22",
										"type": ""
									}
								],
								"src": "9264:366:22"
							},
							{
								"body": {
									"nodeType": "YulBlock",
									"src": "9807:248:22",
									"statements": [
										{
											"nodeType": "YulAssignment",
											"src": "9817:26:22",
											"value": {
												"arguments": [
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "9829:9:22"
													},
													{
														"kind": "number",
														"nodeType": "YulLiteral",
														"src": "9840:2:22",
														"type": "",
														"value": "32"
													}
												],
												"functionName": {
													"name": "add",
													"nodeType": "YulIdentifier",
													"src": "9825:3:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9825:18:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "9817:4:22"
												}
											]
										},
										{
											"expression": {
												"arguments": [
													{
														"arguments": [
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "9864:9:22"
															},
															{
																"kind": "number",
																"nodeType": "YulLiteral",
																"src": "9875:1:22",
																"type": "",
																"value": "0"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "9860:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "9860:17:22"
													},
													{
														"arguments": [
															{
																"name": "tail",
																"nodeType": "YulIdentifier",
																"src": "9883:4:22"
															},
															{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "9889:9:22"
															}
														],
														"functionName": {
															"name": "sub",
															"nodeType": "YulIdentifier",
															"src": "9879:3:22"
														},
														"nodeType": "YulFunctionCall",
														"src": "9879:20:22"
													}
												],
												"functionName": {
													"name": "mstore",
													"nodeType": "YulIdentifier",
													"src": "9853:6:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9853:47:22"
											},
											"nodeType": "YulExpressionStatement",
											"src": "9853:47:22"
										},
										{
											"nodeType": "YulAssignment",
											"src": "9909:139:22",
											"value": {
												"arguments": [
													{
														"name": "tail",
														"nodeType": "YulIdentifier",
														"src": "10043:4:22"
													}
												],
												"functionName": {
													"name": "abi_encode_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe_to_t_string_memory_ptr_fromStack",
													"nodeType": "YulIdentifier",
													"src": "9917:124:22"
												},
												"nodeType": "YulFunctionCall",
												"src": "9917:131:22"
											},
											"variableNames": [
												{
													"name": "tail",
													"nodeType": "YulIdentifier",
													"src": "9909:4:22"
												}
											]
										}
									]
								},
								"name": "abi_encode_tuple_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe__to_t_string_memory_ptr__fromStack_reversed",
								"nodeType": "YulFunctionDefinition",
								"parameters": [
									{
										"name": "headStart",
										"nodeType": "YulTypedName",
										"src": "9787:9:22",
										"type": ""
									}
								],
								"returnVariables": [
									{
										"name": "tail",
										"nodeType": "YulTypedName",
										"src": "9802:4:22",
										"type": ""
									}
								],
								"src": "9636:419:22"
							}
						]
					},
					"contents": "{\n\n    function cleanup_t_uint256(value) -> cleaned {\n        cleaned := value\n    }\n\n    function panic_error_0x11() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x11)\n        revert(0, 0x24)\n    }\n\n    function checked_add_t_uint256(x, y) -> sum {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n        sum := add(x, y)\n\n        if gt(x, sum) { panic_error_0x11() }\n\n    }\n\n    function allocate_unbounded() -> memPtr {\n        memPtr := mload(64)\n    }\n\n    function revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() {\n        revert(0, 0)\n    }\n\n    function revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() {\n        revert(0, 0)\n    }\n\n    function cleanup_t_uint160(value) -> cleaned {\n        cleaned := and(value, 0xffffffffffffffffffffffffffffffffffffffff)\n    }\n\n    function cleanup_t_address(value) -> cleaned {\n        cleaned := cleanup_t_uint160(value)\n    }\n\n    function validator_revert_t_address(value) {\n        if iszero(eq(value, cleanup_t_address(value))) { revert(0, 0) }\n    }\n\n    function abi_decode_t_address(offset, end) -> value {\n        value := calldataload(offset)\n        validator_revert_t_address(value)\n    }\n\n    function abi_decode_tuple_t_address(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_encode_t_uint256_to_t_uint256_fromStack(value, pos) {\n        mstore(pos, cleanup_t_uint256(value))\n    }\n\n    function abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function abi_encode_t_address_to_t_address_fromStack(value, pos) {\n        mstore(pos, cleanup_t_address(value))\n    }\n\n    function abi_encode_tuple_t_address__to_t_address__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_address_to_t_address_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function identity(value) -> ret {\n        ret := value\n    }\n\n    function convert_t_uint160_to_t_uint160(value) -> converted {\n        converted := cleanup_t_uint160(identity(cleanup_t_uint160(value)))\n    }\n\n    function convert_t_uint160_to_t_address(value) -> converted {\n        converted := convert_t_uint160_to_t_uint160(value)\n    }\n\n    function convert_t_contract$_J3d_$4651_to_t_address(value) -> converted {\n        converted := convert_t_uint160_to_t_address(value)\n    }\n\n    function abi_encode_t_contract$_J3d_$4651_to_t_address_fromStack(value, pos) {\n        mstore(pos, convert_t_contract$_J3d_$4651_to_t_address(value))\n    }\n\n    function abi_encode_tuple_t_contract$_J3d_$4651__to_t_address__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_contract$_J3d_$4651_to_t_address_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function validator_revert_t_uint256(value) {\n        if iszero(eq(value, cleanup_t_uint256(value))) { revert(0, 0) }\n    }\n\n    function abi_decode_t_uint256_fromMemory(offset, end) -> value {\n        value := mload(offset)\n        validator_revert_t_uint256(value)\n    }\n\n    function abi_decode_tuple_t_uint256_fromMemory(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_uint256_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length) -> updated_pos {\n        mstore(pos, length)\n        updated_pos := add(pos, 0x20)\n    }\n\n    function store_literal_in_memory_139c47b7580e446b48d606a3f066f4bb9a530aea96c9ddc50ffded7b28813cfe(memPtr) {\n\n        mstore(add(memPtr, 0), \"You must be the owner of an toke\")\n\n        mstore(add(memPtr, 32), \"n to claim funds.\")\n\n    }\n\n    function abi_encode_t_stringliteral_139c47b7580e446b48d606a3f066f4bb9a530aea96c9ddc50ffded7b28813cfe_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 49)\n        store_literal_in_memory_139c47b7580e446b48d606a3f066f4bb9a530aea96c9ddc50ffded7b28813cfe(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_139c47b7580e446b48d606a3f066f4bb9a530aea96c9ddc50ffded7b28813cfe__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_139c47b7580e446b48d606a3f066f4bb9a530aea96c9ddc50ffded7b28813cfe_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function checked_sub_t_uint256(x, y) -> diff {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n        diff := sub(x, y)\n\n        if gt(diff, x) { panic_error_0x11() }\n\n    }\n\n    function checked_mul_t_uint256(x, y) -> product {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n        let product_raw := mul(x, y)\n        product := cleanup_t_uint256(product_raw)\n\n        // overflow, if x != 0 and y != product/x\n        if iszero(\n            or(\n                iszero(x),\n                eq(y, div(product, x))\n            )\n        ) { panic_error_0x11() }\n\n    }\n\n    function panic_error_0x12() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x12)\n        revert(0, 0x24)\n    }\n\n    function checked_div_t_uint256(x, y) -> r {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n        if iszero(y) { panic_error_0x12() }\n\n        r := div(x, y)\n    }\n\n    function store_literal_in_memory_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d(memPtr) {\n\n        mstore(add(memPtr, 0), \"No funds to claim\")\n\n    }\n\n    function abi_encode_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 17)\n        store_literal_in_memory_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d(pos)\n        end := add(pos, 32)\n    }\n\n    function abi_encode_tuple_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_0716848cbbeaf66f0f3af143f3d5a8db6c9ee5b7aec04537ff41434b9d229b1d_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function array_storeLengthForEncoding_t_bytes_memory_ptr_nonPadded_inplace_fromStack(pos, length) -> updated_pos {\n        updated_pos := pos\n    }\n\n    function store_literal_in_memory_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470(memPtr) {\n\n    }\n\n    function abi_encode_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470_to_t_bytes_memory_ptr_nonPadded_inplace_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_bytes_memory_ptr_nonPadded_inplace_fromStack(pos, 0)\n        store_literal_in_memory_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470(pos)\n        end := add(pos, 0)\n    }\n\n    function abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed(pos ) -> end {\n\n        pos := abi_encode_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470_to_t_bytes_memory_ptr_nonPadded_inplace_fromStack( pos)\n\n        end := pos\n    }\n\n    function store_literal_in_memory_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba(memPtr) {\n\n        mstore(add(memPtr, 0), \"no\")\n\n    }\n\n    function abi_encode_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 2)\n        store_literal_in_memory_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba(pos)\n        end := add(pos, 32)\n    }\n\n    function abi_encode_tuple_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_7d6119d3ee7f82ee53aac57d4d088f8bbaca5aac3191bb074252c6d760ae4eba_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe(memPtr) {\n\n        mstore(add(memPtr, 0), \"Ownable: caller is not the owner\")\n\n    }\n\n    function abi_encode_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 32)\n        store_literal_in_memory_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe(pos)\n        end := add(pos, 32)\n    }\n\n    function abi_encode_tuple_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_9924ebdf1add33d25d4ef888e16131f0a5687b0580a36c21b5c301a6c462effe_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n}\n",
					"id": 22,
					"language": "Yul",
					"name": "#utility.yul"
				}
			],
			"immutableReferences": {},
			"linkReferences": {},
			"object": "6080604052600436106100c65760003560e01c80638da5cb5b1161007f578063d0e30db011610059578063d0e30db01461028b578063eb8bbd2814610295578063f2fde38b146102c0578063fc0c546a146102e9576100e5565b80638da5cb5b146101f8578063968ed60014610223578063c6788bdd1461024e576100e5565b806326a4e8d2146100ea5780634e71d92d146101135780635821b68a1461012a5780636f8b65a414610167578063715018a6146101a457806377f46763146101bb576100e5565b366100e55734600260008282546100dd9190610af0565b925050819055005b600080fd5b3480156100f657600080fd5b50610111600480360381019061010c9190610b87565b610314565b005b34801561011f57600080fd5b50610128610360565b005b34801561013657600080fd5b50610151600480360381019061014c9190610b87565b610764565b60405161015e9190610bc3565b60405180910390f35b34801561017357600080fd5b5061018e60048036038101906101899190610b87565b610809565b60405161019b9190610bc3565b60405180910390f35b3480156101b057600080fd5b506101b9610821565b005b3480156101c757600080fd5b506101e260048036038101906101dd9190610b87565b610835565b6040516101ef9190610bc3565b60405180910390f35b34801561020457600080fd5b5061020d61084d565b60405161021a9190610bed565b60405180910390f35b34801561022f57600080fd5b50610238610876565b6040516102459190610bc3565b60405180910390f35b34801561025a57600080fd5b5061027560048036038101906102709190610b87565b61087c565b6040516102829190610bc3565b60405180910390f35b610293610894565b005b3480156102a157600080fd5b506102aa6108af565b6040516102b79190610bc3565b60405180910390f35b3480156102cc57600080fd5b506102e760048036038101906102e29190610b87565b6108b9565b005b3480156102f557600080fd5b506102fe610947565b60405161030b9190610c67565b60405180910390f35b61031c61096d565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016103bd9190610bed565b602060405180830381865afa1580156103da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103fe9190610cae565b1161043e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161043590610d5e565b60405180910390fd5b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104d19190610cae565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b815260040161052c9190610bed565b602060405180830381865afa158015610549573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056d9190610cae565b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546002546105ba9190610d7e565b6105c49190610db2565b6105ce9190610e23565b905060008111610613576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060a90610ea0565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168161d37a9060405161063b90610ef1565b600060405180830381858888f193505050503d8060008114610679576040519150601f19603f3d011682016040523d82523d6000602084013e61067e565b606091505b50505080600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546106d09190610af0565b92505081905550600254600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555042600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231836040518263ffffffff1660e01b81526004016107c19190610bed565b602060405180830381865afa1580156107de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108029190610cae565b9050919050565b60036020528060005260406000206000915090505481565b61082961096d565b61083360006109eb565b565b60046020528060005260406000206000915090505481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60025481565b60056020528060005260406000206000915090505481565b34600260008282546108a69190610af0565b92505081905550565b6000600254905090565b73791f1cfb231e7c75eee4b7f8913e3c2b3548eb9373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461093b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093290610f52565b60405180910390fd5b610944816109eb565b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610975610aaf565b73ffffffffffffffffffffffffffffffffffffffff1661099361084d565b73ffffffffffffffffffffffffffffffffffffffff16146109e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e090610fbe565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610afb82610ab7565b9150610b0683610ab7565b9250828201905080821115610b1e57610b1d610ac1565b5b92915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610b5482610b29565b9050919050565b610b6481610b49565b8114610b6f57600080fd5b50565b600081359050610b8181610b5b565b92915050565b600060208284031215610b9d57610b9c610b24565b5b6000610bab84828501610b72565b91505092915050565b610bbd81610ab7565b82525050565b6000602082019050610bd86000830184610bb4565b92915050565b610be781610b49565b82525050565b6000602082019050610c026000830184610bde565b92915050565b6000819050919050565b6000610c2d610c28610c2384610b29565b610c08565b610b29565b9050919050565b6000610c3f82610c12565b9050919050565b6000610c5182610c34565b9050919050565b610c6181610c46565b82525050565b6000602082019050610c7c6000830184610c58565b92915050565b610c8b81610ab7565b8114610c9657600080fd5b50565b600081519050610ca881610c82565b92915050565b600060208284031215610cc457610cc3610b24565b5b6000610cd284828501610c99565b91505092915050565b600082825260208201905092915050565b7f596f75206d75737420626520746865206f776e6572206f6620616e20746f6b6560008201527f6e20746f20636c61696d2066756e64732e000000000000000000000000000000602082015250565b6000610d48603183610cdb565b9150610d5382610cec565b604082019050919050565b60006020820190508181036000830152610d7781610d3b565b9050919050565b6000610d8982610ab7565b9150610d9483610ab7565b9250828203905081811115610dac57610dab610ac1565b5b92915050565b6000610dbd82610ab7565b9150610dc883610ab7565b9250828202610dd681610ab7565b91508282048414831517610ded57610dec610ac1565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610e2e82610ab7565b9150610e3983610ab7565b925082610e4957610e48610df4565b5b828204905092915050565b7f4e6f2066756e647320746f20636c61696d000000000000000000000000000000600082015250565b6000610e8a601183610cdb565b9150610e9582610e54565b602082019050919050565b60006020820190508181036000830152610eb981610e7d565b9050919050565b600081905092915050565b50565b6000610edb600083610ec0565b9150610ee682610ecb565b600082019050919050565b6000610efc82610ece565b9150819050919050565b7f6e6f000000000000000000000000000000000000000000000000000000000000600082015250565b6000610f3c600283610cdb565b9150610f4782610f06565b602082019050919050565b60006020820190508181036000830152610f6b81610f2f565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610fa8602083610cdb565b9150610fb382610f72565b602082019050919050565b60006020820190508181036000830152610fd781610f9b565b905091905056fea26469706673582212209426c4a93a7e3611c2bfe671f5a873d9b1713af638b50934980af8ae345efb5364736f6c63430008110033",
			"opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0xC6 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x8DA5CB5B GT PUSH2 0x7F JUMPI DUP1 PUSH4 0xD0E30DB0 GT PUSH2 0x59 JUMPI DUP1 PUSH4 0xD0E30DB0 EQ PUSH2 0x28B JUMPI DUP1 PUSH4 0xEB8BBD28 EQ PUSH2 0x295 JUMPI DUP1 PUSH4 0xF2FDE38B EQ PUSH2 0x2C0 JUMPI DUP1 PUSH4 0xFC0C546A EQ PUSH2 0x2E9 JUMPI PUSH2 0xE5 JUMP JUMPDEST DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0x1F8 JUMPI DUP1 PUSH4 0x968ED600 EQ PUSH2 0x223 JUMPI DUP1 PUSH4 0xC6788BDD EQ PUSH2 0x24E JUMPI PUSH2 0xE5 JUMP JUMPDEST DUP1 PUSH4 0x26A4E8D2 EQ PUSH2 0xEA JUMPI DUP1 PUSH4 0x4E71D92D EQ PUSH2 0x113 JUMPI DUP1 PUSH4 0x5821B68A EQ PUSH2 0x12A JUMPI DUP1 PUSH4 0x6F8B65A4 EQ PUSH2 0x167 JUMPI DUP1 PUSH4 0x715018A6 EQ PUSH2 0x1A4 JUMPI DUP1 PUSH4 0x77F46763 EQ PUSH2 0x1BB JUMPI PUSH2 0xE5 JUMP JUMPDEST CALLDATASIZE PUSH2 0xE5 JUMPI CALLVALUE PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0xDD SWAP2 SWAP1 PUSH2 0xAF0 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE STOP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0xF6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x111 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x10C SWAP2 SWAP1 PUSH2 0xB87 JUMP JUMPDEST PUSH2 0x314 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x11F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x128 PUSH2 0x360 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x136 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x151 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x14C SWAP2 SWAP1 PUSH2 0xB87 JUMP JUMPDEST PUSH2 0x764 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x15E SWAP2 SWAP1 PUSH2 0xBC3 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x173 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x18E PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x189 SWAP2 SWAP1 PUSH2 0xB87 JUMP JUMPDEST PUSH2 0x809 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x19B SWAP2 SWAP1 PUSH2 0xBC3 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1B0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1B9 PUSH2 0x821 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1C7 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1E2 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x1DD SWAP2 SWAP1 PUSH2 0xB87 JUMP JUMPDEST PUSH2 0x835 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x1EF SWAP2 SWAP1 PUSH2 0xBC3 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x204 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x20D PUSH2 0x84D JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x21A SWAP2 SWAP1 PUSH2 0xBED JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x22F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x238 PUSH2 0x876 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x245 SWAP2 SWAP1 PUSH2 0xBC3 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x25A JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x275 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x270 SWAP2 SWAP1 PUSH2 0xB87 JUMP JUMPDEST PUSH2 0x87C JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x282 SWAP2 SWAP1 PUSH2 0xBC3 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x293 PUSH2 0x894 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2A1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x2AA PUSH2 0x8AF JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x2B7 SWAP2 SWAP1 PUSH2 0xBC3 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2CC JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x2E7 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x2E2 SWAP2 SWAP1 PUSH2 0xB87 JUMP JUMPDEST PUSH2 0x8B9 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2F5 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x2FE PUSH2 0x947 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x30B SWAP2 SWAP1 PUSH2 0xC67 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x31C PUSH2 0x96D JUMP JUMPDEST DUP1 PUSH1 0x1 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x70A08231 CALLER PUSH1 0x40 MLOAD DUP3 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x3BD SWAP2 SWAP1 PUSH2 0xBED JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x3DA JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x3FE SWAP2 SWAP1 PUSH2 0xCAE JUMP JUMPDEST GT PUSH2 0x43E JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x435 SWAP1 PUSH2 0xD5E JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x18160DDD PUSH1 0x40 MLOAD DUP2 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x4AD JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x4D1 SWAP2 SWAP1 PUSH2 0xCAE JUMP JUMPDEST PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x70A08231 CALLER PUSH1 0x40 MLOAD DUP3 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x52C SWAP2 SWAP1 PUSH2 0xBED JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x549 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x56D SWAP2 SWAP1 PUSH2 0xCAE JUMP JUMPDEST PUSH1 0x4 PUSH1 0x0 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH1 0x2 SLOAD PUSH2 0x5BA SWAP2 SWAP1 PUSH2 0xD7E JUMP JUMPDEST PUSH2 0x5C4 SWAP2 SWAP1 PUSH2 0xDB2 JUMP JUMPDEST PUSH2 0x5CE SWAP2 SWAP1 PUSH2 0xE23 JUMP JUMPDEST SWAP1 POP PUSH1 0x0 DUP2 GT PUSH2 0x613 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x60A SWAP1 PUSH2 0xEA0 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH2 0xD37A SWAP1 PUSH1 0x40 MLOAD PUSH2 0x63B SWAP1 PUSH2 0xEF1 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x679 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x67E JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP POP DUP1 PUSH1 0x5 PUSH1 0x0 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x6D0 SWAP2 SWAP1 PUSH2 0xAF0 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP PUSH1 0x2 SLOAD PUSH1 0x4 PUSH1 0x0 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP TIMESTAMP PUSH1 0x3 PUSH1 0x0 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x70A08231 DUP4 PUSH1 0x40 MLOAD DUP3 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x7C1 SWAP2 SWAP1 PUSH2 0xBED JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x7DE JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x802 SWAP2 SWAP1 PUSH2 0xCAE JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x3 PUSH1 0x20 MSTORE DUP1 PUSH1 0x0 MSTORE PUSH1 0x40 PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP2 POP SWAP1 POP SLOAD DUP2 JUMP JUMPDEST PUSH2 0x829 PUSH2 0x96D JUMP JUMPDEST PUSH2 0x833 PUSH1 0x0 PUSH2 0x9EB JUMP JUMPDEST JUMP JUMPDEST PUSH1 0x4 PUSH1 0x20 MSTORE DUP1 PUSH1 0x0 MSTORE PUSH1 0x40 PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP2 POP SWAP1 POP SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x2 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x5 PUSH1 0x20 MSTORE DUP1 PUSH1 0x0 MSTORE PUSH1 0x40 PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP2 POP SWAP1 POP SLOAD DUP2 JUMP JUMPDEST CALLVALUE PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x8A6 SWAP2 SWAP1 PUSH2 0xAF0 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH20 0x791F1CFB231E7C75EEE4B7F8913E3C2B3548EB93 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x93B JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x932 SWAP1 PUSH2 0xF52 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x944 DUP2 PUSH2 0x9EB JUMP JUMPDEST POP JUMP JUMPDEST PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP JUMPDEST PUSH2 0x975 PUSH2 0xAAF JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x993 PUSH2 0x84D JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x9E9 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x9E0 SWAP1 PUSH2 0xFBE JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP DUP2 PUSH1 0x0 DUP1 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 PUSH1 0x40 MLOAD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH1 0x0 CALLER SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 PUSH2 0xAFB DUP3 PUSH2 0xAB7 JUMP JUMPDEST SWAP2 POP PUSH2 0xB06 DUP4 PUSH2 0xAB7 JUMP JUMPDEST SWAP3 POP DUP3 DUP3 ADD SWAP1 POP DUP1 DUP3 GT ISZERO PUSH2 0xB1E JUMPI PUSH2 0xB1D PUSH2 0xAC1 JUMP JUMPDEST JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xB54 DUP3 PUSH2 0xB29 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0xB64 DUP2 PUSH2 0xB49 JUMP JUMPDEST DUP2 EQ PUSH2 0xB6F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0xB81 DUP2 PUSH2 0xB5B JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xB9D JUMPI PUSH2 0xB9C PUSH2 0xB24 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0xBAB DUP5 DUP3 DUP6 ADD PUSH2 0xB72 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0xBBD DUP2 PUSH2 0xAB7 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xBD8 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xBB4 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0xBE7 DUP2 PUSH2 0xB49 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xC02 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xBDE JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xC2D PUSH2 0xC28 PUSH2 0xC23 DUP5 PUSH2 0xB29 JUMP JUMPDEST PUSH2 0xC08 JUMP JUMPDEST PUSH2 0xB29 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xC3F DUP3 PUSH2 0xC12 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xC51 DUP3 PUSH2 0xC34 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0xC61 DUP2 PUSH2 0xC46 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xC7C PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xC58 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0xC8B DUP2 PUSH2 0xAB7 JUMP JUMPDEST DUP2 EQ PUSH2 0xC96 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP PUSH2 0xCA8 DUP2 PUSH2 0xC82 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xCC4 JUMPI PUSH2 0xCC3 PUSH2 0xB24 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0xCD2 DUP5 DUP3 DUP6 ADD PUSH2 0xC99 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x596F75206D75737420626520746865206F776E6572206F6620616E20746F6B65 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6E20746F20636C61696D2066756E64732E000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xD48 PUSH1 0x31 DUP4 PUSH2 0xCDB JUMP JUMPDEST SWAP2 POP PUSH2 0xD53 DUP3 PUSH2 0xCEC JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xD77 DUP2 PUSH2 0xD3B JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xD89 DUP3 PUSH2 0xAB7 JUMP JUMPDEST SWAP2 POP PUSH2 0xD94 DUP4 PUSH2 0xAB7 JUMP JUMPDEST SWAP3 POP DUP3 DUP3 SUB SWAP1 POP DUP2 DUP2 GT ISZERO PUSH2 0xDAC JUMPI PUSH2 0xDAB PUSH2 0xAC1 JUMP JUMPDEST JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xDBD DUP3 PUSH2 0xAB7 JUMP JUMPDEST SWAP2 POP PUSH2 0xDC8 DUP4 PUSH2 0xAB7 JUMP JUMPDEST SWAP3 POP DUP3 DUP3 MUL PUSH2 0xDD6 DUP2 PUSH2 0xAB7 JUMP JUMPDEST SWAP2 POP DUP3 DUP3 DIV DUP5 EQ DUP4 ISZERO OR PUSH2 0xDED JUMPI PUSH2 0xDEC PUSH2 0xAC1 JUMP JUMPDEST JUMPDEST POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x12 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 PUSH2 0xE2E DUP3 PUSH2 0xAB7 JUMP JUMPDEST SWAP2 POP PUSH2 0xE39 DUP4 PUSH2 0xAB7 JUMP JUMPDEST SWAP3 POP DUP3 PUSH2 0xE49 JUMPI PUSH2 0xE48 PUSH2 0xDF4 JUMP JUMPDEST JUMPDEST DUP3 DUP3 DIV SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x4E6F2066756E647320746F20636C61696D000000000000000000000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xE8A PUSH1 0x11 DUP4 PUSH2 0xCDB JUMP JUMPDEST SWAP2 POP PUSH2 0xE95 DUP3 PUSH2 0xE54 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xEB9 DUP2 PUSH2 0xE7D JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xEDB PUSH1 0x0 DUP4 PUSH2 0xEC0 JUMP JUMPDEST SWAP2 POP PUSH2 0xEE6 DUP3 PUSH2 0xECB JUMP JUMPDEST PUSH1 0x0 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xEFC DUP3 PUSH2 0xECE JUMP JUMPDEST SWAP2 POP DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x6E6F000000000000000000000000000000000000000000000000000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xF3C PUSH1 0x2 DUP4 PUSH2 0xCDB JUMP JUMPDEST SWAP2 POP PUSH2 0xF47 DUP3 PUSH2 0xF06 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xF6B DUP2 PUSH2 0xF2F JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4F776E61626C653A2063616C6C6572206973206E6F7420746865206F776E6572 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xFA8 PUSH1 0x20 DUP4 PUSH2 0xCDB JUMP JUMPDEST SWAP2 POP PUSH2 0xFB3 DUP3 PUSH2 0xF72 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xFD7 DUP2 PUSH2 0xF9B JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 SWAP5 0x26 0xC4 0xA9 GASPRICE PUSH31 0x3611C2BFE671F5A873D9B1713AF638B50934980AF8AE345EFB5364736F6C63 NUMBER STOP ADDMOD GT STOP CALLER ",
			"sourceMap": "352:2903:21:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1535:9;1521:10;;:23;;;;;;;:::i;:::-;;;;;;;;352:2903;;;;1162:102;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;2075:718;;;;;;;;;;;;;:::i;:::-;;3140:112;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;786:50;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1831:101:0;;;;;;;;;;;;;:::i;:::-;;840:43:21;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1201:85:0;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;575:22:21;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;887:41;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1732:68;;;:::i;:::-;;2923:82;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1274:203;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;444:16;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1162:102;1094:13:0;:11;:13::i;:::-;1244::21::1;1232:5;;:26;;;;;;;;;;;;;;;;;;1162:102:::0;:::o;2075:718::-;2199:1;2169:5;;;;;;;;;;;:15;;;2185:10;2169:27;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;:31;2161:93;;;;;;;;;;;;:::i;:::-;;;;;;;;;2421:21;2514:5;;;;;;;;;;;:17;;;:19;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;2483:5;;;;;;;;;;;:15;;;2499:10;2483:27;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;2459:8;:20;2468:10;2459:20;;;;;;;;;;;;;;;;2446:10;;:33;;;;:::i;:::-;2445:65;;;;:::i;:::-;:88;;;;:::i;:::-;2421:112;;2565:1;2549:13;:17;2541:47;;;;;;;;;;;;:::i;:::-;;;;;;;;;2602:10;2594:24;;2625:13;2645:5;2594:61;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2683:13;2661:6;:18;2668:10;2661:18;;;;;;;;;;;;;;;;:35;;;;;;;:::i;:::-;;;;;;;;2725:10;;2702:8;:20;2711:10;2702:20;;;;;;;;;;;;;;;:33;;;;2771:15;2741;:27;2757:10;2741:27;;;;;;;;;;;;;;;:45;;;;2099:694;2075:718::o;3140:112::-;3201:7;3223:5;;;;;;;;;;;:15;;;3239:5;3223:22;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;3216:29;;3140:112;;;:::o;786:50::-;;;;;;;;;;;;;;;;;:::o;1831:101:0:-;1094:13;:11;:13::i;:::-;1895:30:::1;1922:1;1895:18;:30::i;:::-;1831:101::o:0;840:43:21:-;;;;;;;;;;;;;;;;;:::o;1201:85:0:-;1247:7;1273:6;;;;;;;;;;;1266:13;;1201:85;:::o;575:22:21:-;;;;:::o;887:41::-;;;;;;;;;;;;;;;;;:::o;1732:68::-;1786:9;1772:10;;:23;;;;;;;:::i;:::-;;;;;;;;1732:68::o;2923:82::-;2969:4;2988:10;;2981:17;;2923:82;:::o;1274:203::-;1373:42;1359:56;;:10;:56;;;1351:71;;;;;;;;;;;;:::i;:::-;;;;;;;;;1437:28;1456:8;1437:18;:28::i;:::-;1274:203;:::o;444:16::-;;;;;;;;;;;;;:::o;1359:130:0:-;1433:12;:10;:12::i;:::-;1422:23;;:7;:5;:7::i;:::-;:23;;;1414:68;;;;;;;;;;;;:::i;:::-;;;;;;;;;1359:130::o;2433:187::-;2506:16;2525:6;;;;;;;;;;;2506:25;;2550:8;2541:6;;:17;;;;;;;;;;;;;;;;;;2604:8;2573:40;;2594:8;2573:40;;;;;;;;;;;;2496:124;2433:187;:::o;640:96:11:-;693:7;719:10;712:17;;640:96;:::o;7:77:22:-;44:7;73:5;62:16;;7:77;;;:::o;90:180::-;138:77;135:1;128:88;235:4;232:1;225:15;259:4;256:1;249:15;276:191;316:3;335:20;353:1;335:20;:::i;:::-;330:25;;369:20;387:1;369:20;:::i;:::-;364:25;;412:1;409;405:9;398:16;;433:3;430:1;427:10;424:36;;;440:18;;:::i;:::-;424:36;276:191;;;;:::o;554:117::-;663:1;660;653:12;800:126;837:7;877:42;870:5;866:54;855:65;;800:126;;;:::o;932:96::-;969:7;998:24;1016:5;998:24;:::i;:::-;987:35;;932:96;;;:::o;1034:122::-;1107:24;1125:5;1107:24;:::i;:::-;1100:5;1097:35;1087:63;;1146:1;1143;1136:12;1087:63;1034:122;:::o;1162:139::-;1208:5;1246:6;1233:20;1224:29;;1262:33;1289:5;1262:33;:::i;:::-;1162:139;;;;:::o;1307:329::-;1366:6;1415:2;1403:9;1394:7;1390:23;1386:32;1383:119;;;1421:79;;:::i;:::-;1383:119;1541:1;1566:53;1611:7;1602:6;1591:9;1587:22;1566:53;:::i;:::-;1556:63;;1512:117;1307:329;;;;:::o;1642:118::-;1729:24;1747:5;1729:24;:::i;:::-;1724:3;1717:37;1642:118;;:::o;1766:222::-;1859:4;1897:2;1886:9;1882:18;1874:26;;1910:71;1978:1;1967:9;1963:17;1954:6;1910:71;:::i;:::-;1766:222;;;;:::o;1994:118::-;2081:24;2099:5;2081:24;:::i;:::-;2076:3;2069:37;1994:118;;:::o;2118:222::-;2211:4;2249:2;2238:9;2234:18;2226:26;;2262:71;2330:1;2319:9;2315:17;2306:6;2262:71;:::i;:::-;2118:222;;;;:::o;2346:60::-;2374:3;2395:5;2388:12;;2346:60;;;:::o;2412:142::-;2462:9;2495:53;2513:34;2522:24;2540:5;2522:24;:::i;:::-;2513:34;:::i;:::-;2495:53;:::i;:::-;2482:66;;2412:142;;;:::o;2560:126::-;2610:9;2643:37;2674:5;2643:37;:::i;:::-;2630:50;;2560:126;;;:::o;2692:138::-;2754:9;2787:37;2818:5;2787:37;:::i;:::-;2774:50;;2692:138;;;:::o;2836:155::-;2935:49;2978:5;2935:49;:::i;:::-;2930:3;2923:62;2836:155;;:::o;2997:246::-;3102:4;3140:2;3129:9;3125:18;3117:26;;3153:83;3233:1;3222:9;3218:17;3209:6;3153:83;:::i;:::-;2997:246;;;;:::o;3249:122::-;3322:24;3340:5;3322:24;:::i;:::-;3315:5;3312:35;3302:63;;3361:1;3358;3351:12;3302:63;3249:122;:::o;3377:143::-;3434:5;3465:6;3459:13;3450:22;;3481:33;3508:5;3481:33;:::i;:::-;3377:143;;;;:::o;3526:351::-;3596:6;3645:2;3633:9;3624:7;3620:23;3616:32;3613:119;;;3651:79;;:::i;:::-;3613:119;3771:1;3796:64;3852:7;3843:6;3832:9;3828:22;3796:64;:::i;:::-;3786:74;;3742:128;3526:351;;;;:::o;3883:169::-;3967:11;4001:6;3996:3;3989:19;4041:4;4036:3;4032:14;4017:29;;3883:169;;;;:::o;4058:236::-;4198:34;4194:1;4186:6;4182:14;4175:58;4267:19;4262:2;4254:6;4250:15;4243:44;4058:236;:::o;4300:366::-;4442:3;4463:67;4527:2;4522:3;4463:67;:::i;:::-;4456:74;;4539:93;4628:3;4539:93;:::i;:::-;4657:2;4652:3;4648:12;4641:19;;4300:366;;;:::o;4672:419::-;4838:4;4876:2;4865:9;4861:18;4853:26;;4925:9;4919:4;4915:20;4911:1;4900:9;4896:17;4889:47;4953:131;5079:4;4953:131;:::i;:::-;4945:139;;4672:419;;;:::o;5097:194::-;5137:4;5157:20;5175:1;5157:20;:::i;:::-;5152:25;;5191:20;5209:1;5191:20;:::i;:::-;5186:25;;5235:1;5232;5228:9;5220:17;;5259:1;5253:4;5250:11;5247:37;;;5264:18;;:::i;:::-;5247:37;5097:194;;;;:::o;5297:410::-;5337:7;5360:20;5378:1;5360:20;:::i;:::-;5355:25;;5394:20;5412:1;5394:20;:::i;:::-;5389:25;;5449:1;5446;5442:9;5471:30;5489:11;5471:30;:::i;:::-;5460:41;;5650:1;5641:7;5637:15;5634:1;5631:22;5611:1;5604:9;5584:83;5561:139;;5680:18;;:::i;:::-;5561:139;5345:362;5297:410;;;;:::o;5713:180::-;5761:77;5758:1;5751:88;5858:4;5855:1;5848:15;5882:4;5879:1;5872:15;5899:185;5939:1;5956:20;5974:1;5956:20;:::i;:::-;5951:25;;5990:20;6008:1;5990:20;:::i;:::-;5985:25;;6029:1;6019:35;;6034:18;;:::i;:::-;6019:35;6076:1;6073;6069:9;6064:14;;5899:185;;;;:::o;6090:167::-;6230:19;6226:1;6218:6;6214:14;6207:43;6090:167;:::o;6263:366::-;6405:3;6426:67;6490:2;6485:3;6426:67;:::i;:::-;6419:74;;6502:93;6591:3;6502:93;:::i;:::-;6620:2;6615:3;6611:12;6604:19;;6263:366;;;:::o;6635:419::-;6801:4;6839:2;6828:9;6824:18;6816:26;;6888:9;6882:4;6878:20;6874:1;6863:9;6859:17;6852:47;6916:131;7042:4;6916:131;:::i;:::-;6908:139;;6635:419;;;:::o;7060:147::-;7161:11;7198:3;7183:18;;7060:147;;;;:::o;7213:114::-;;:::o;7333:398::-;7492:3;7513:83;7594:1;7589:3;7513:83;:::i;:::-;7506:90;;7605:93;7694:3;7605:93;:::i;:::-;7723:1;7718:3;7714:11;7707:18;;7333:398;;;:::o;7737:379::-;7921:3;7943:147;8086:3;7943:147;:::i;:::-;7936:154;;8107:3;8100:10;;7737:379;;;:::o;8122:152::-;8262:4;8258:1;8250:6;8246:14;8239:28;8122:152;:::o;8280:365::-;8422:3;8443:66;8507:1;8502:3;8443:66;:::i;:::-;8436:73;;8518:93;8607:3;8518:93;:::i;:::-;8636:2;8631:3;8627:12;8620:19;;8280:365;;;:::o;8651:419::-;8817:4;8855:2;8844:9;8840:18;8832:26;;8904:9;8898:4;8894:20;8890:1;8879:9;8875:17;8868:47;8932:131;9058:4;8932:131;:::i;:::-;8924:139;;8651:419;;;:::o;9076:182::-;9216:34;9212:1;9204:6;9200:14;9193:58;9076:182;:::o;9264:366::-;9406:3;9427:67;9491:2;9486:3;9427:67;:::i;:::-;9420:74;;9503:93;9592:3;9503:93;:::i;:::-;9621:2;9616:3;9612:12;9605:19;;9264:366;;;:::o;9636:419::-;9802:4;9840:2;9829:9;9825:18;9817:26;;9889:9;9883:4;9879:20;9875:1;9864:9;9860:17;9853:47;9917:131;10043:4;9917:131;:::i;:::-;9909:139;;9636:419;;;:::o"
		},
		"gasEstimates": {
			"creation": {
				"codeDepositCost": "823200",
				"executionCost": "infinite",
				"totalCost": "infinite"
			},
			"external": {
				"claim()": "infinite",
				"claimTimestamps(address)": "2881",
				"claims(address)": "2881",
				"deposit()": "infinite",
				"getTotalFunds()": "2481",
				"gettokenBalance(address)": "infinite",
				"lastMark(address)": "2925",
				"owner()": "2545",
				"renounceOwnership()": "30487",
				"setTokenAddress(address)": "26987",
				"token()": "infinite",
				"totalFunds()": "2474",
				"transferOwnership(address)": "28545"
			}
		},
		"methodIdentifiers": {
			"claim()": "4e71d92d",
			"claimTimestamps(address)": "6f8b65a4",
			"claims(address)": "c6788bdd",
			"deposit()": "d0e30db0",
			"getTotalFunds()": "eb8bbd28",
			"gettokenBalance(address)": "5821b68a",
			"lastMark(address)": "77f46763",
			"owner()": "8da5cb5b",
			"renounceOwnership()": "715018a6",
			"setTokenAddress(address)": "26a4e8d2",
			"token()": "fc0c546a",
			"totalFunds()": "968ed600",
			"transferOwnership(address)": "f2fde38b"
		}
	},
	"abi": [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "claim",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "claimTimestamps",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "claims",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "deposit",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getTotalFunds",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "gettokenBalance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "lastMark",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "renounceOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_tokenAddress",
					"type": "address"
				}
			],
			"name": "setTokenAddress",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "token",
			"outputs": [
				{
					"internalType": "contract J3d",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalFunds",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "receive"
		}
	]
}
const keyAbi = [
	{
		"inputs": [
			{
				"internalType": "contract JGame",
				"name": "_game",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "awardItem",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "isApprovedOrOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const WalletContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: right;
`;

const WalletAmount = styled.div`
  color: black;
  width: auto;
  padding: 5px 5px 5px 16px;
  min-width: 48px;
  min-height: auto;
  border-radius: 22px;
  background-color: var(--main-text-color);
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: 500;
  line-height: 1.75;
  text-transform: uppercase;
  border: 0;
  margin: 0;
  display: inline-flex;
  outline: 0;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  justify-content: flex-start;
  gap: 10px;
`;

const Wallet = styled.ul`
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
`;

const ConnectButton = styled(Button)`
  border-radius: 18px !important;
  padding: 6px 16px;
  background-color: #4E44CE;
  margin: 0 auto;
`;

const NFT = styled(Paper)`
  min-width: 66%;
  margin: 0 auto;
  padding: 1px 5px 5px 5px;
  flex: 1 1 auto;
  background-color: var(--card-background-color) !important;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22) !important;
`;

const Card = styled(Paper)`
  display: inline-block;
  background-color: var(--countdown-background-color) !important;
  margin: 5px;
  min-width: 40px;
  padding: 24px;

  h1 {
    margin: 0px;
  }
`;

const MintButtonContainer = styled.div`
  button.MuiButton-contained:not(.MuiButton-containedPrimary).Mui-disabled {
    color: #464646;
  }

  button.MuiButton-contained:not(.MuiButton-containedPrimary):hover,
  button.MuiButton-contained:not(.MuiButton-containedPrimary):focus {
    -webkit-animation: pulse 1s;
    animation: pulse 1s;
    box-shadow: 0 0 0 2em rgba(255, 255, 255, 0);
  }

  @-webkit-keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #ef8f6e;
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #ef8f6e;
    }
  }
`;

const SolExplorerLink = styled.a`
  color: var(--title-text-color);
  border-bottom: 1px solid var(--title-text-color);
  font-weight: bold;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  outline: none;
  text-decoration: none;
  text-size-adjust: 100%;

  :hover {
    border-bottom: 2px solid var(--title-text-color);
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 4%;
  margin-left: 4%;
  text-align: center;
  justify-content: center;
`;

const MintContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  flex-wrap: wrap;
  gap: 20px;
`;

const DesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 20px;
`;

const Price = styled(Chip)`
  position: absolute;
  margin: 5px;
  font-weight: bold;
  font-size: 1.2em !important;
  font-family: 'Patrick Hand', cursive !important;
`;

const Image = styled.img`
  height: 400px;
  width: auto;
  border-radius: 7px;
  box-shadow: 5px 5px 40px 5px rgba(0, 0, 0, 0.5);
`;

const BorderLinearProgress = styled(LinearProgress)`
  margin: 20px;
  height: 10px !important;
  border-radius: 30px;
  border: 2px solid white;
  box-shadow: 5px 5px 40px 5px rgba(0, 0, 0, 0.5);
  background-color: var(--main-text-color) !important;

  > div.MuiLinearProgress-barColorPrimary {
    background-color: var(--title-text-color) !important;
  }

  > div.MuiLinearProgress-bar1Determinate {
    border-radius: 30px !important;
    background-image: linear-gradient(270deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.5));
  }
`;

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}const Home = () => {



	const [alchemy, setAlchemy] = useState<any>(true);
	const [first, setFirst] = useState<boolean>(true);
	const [addy, setAddy] = useState<string>();
	const [toks, setToks] = useState<string>();
	const [nfts, setNfts] = useState<string>();

	const [contract, setContract] = useState<ethers.Contract>();
	const [team, setTeam] = useState<number>();
	const [isOpen, setIsOpen] = useState(false);
	const [wTeam, setWTeam] = useState<string>("");
	
	function Modal() {
	  function openModal() {
		setIsOpen(true);
	  }
	
	  function closeModal() {
		setIsOpen(false);
	  }
	
	  return (
		<React.Fragment>
		  <CTAButton disabled={isOpen} onClick={openModal}>Rules</CTAButton>
		  {isOpen && (
			<div className="modal">
			  <div className="modal-header">
				<button onClick={closeModal}>Close</button>
			  </div>
			  <div className="modal-content">
				<h1>Rules:</h1>
				1. buy keys
				<br/>  1a. 1% of fees to dev
				<br/>  1b. 19% of fees to the fanout for keyholders
				<br/>  1c. 80% of fees to the pot
				<br/>  1d. price for the next key is 1% more than this one<br/>
				<br/>2. people can burn a key, after choosing a team
				<br/>  2a. when they do, they become winner
				<br/>  2b. the timer resets to now + 8hrs<br/>
				<br/>3. at any point, keyholders can 'claim'
				<br/>  3a. this pays them their fair share of the fees since <br/>the last time that nft had claimed and the tokens, too<br/>
				<br/>4. when the timer reaches 0, anyone can press to conclude the round
				<br/>  4a. this pays the last keyburner different %s to the player,<br/> token holders, nft holders, and pushed to the next round in the pot
				<br/>  4b. timer is set to now + 8hrs
				
				<br /> <br />
				pepes prefer the winner... <br/> kings prefer everything equal... <br/> bulls are all about nfts.. <br/> and bears about tokens :D<br/><br/><br/>see here for more details: https://pastebin.com/WnRLswUH
			  </div>
			</div>
		  )}
		</React.Fragment>
	  );
	}
	

    const [winner, setWinner] = useState<string>( );
    const [timer, setTimer] = useState<number>( );
    const [claimed, setClaimed] = useState<number>(0);
    const connectToEthereum = async () => {
		// @ts-ignore
        
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        // MetaMask requires requesting permission to connect users accounts
        await provider.send("eth_requestAccounts", []);
        
        // The MetaMask plugin also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        const signer = provider.getSigner()
		const { chainId } = await provider.getNetwork()
console.log(chainId) // 42
let contract2: ethers.Contract 
if (chainId == 137) {
         contract2 = new ethers.Contract(gameAddressMatic, gameAbi.abi, signer)
       setNetToks("MATIC")
	   setContract(contract2)
	   setAlchemy( initializeAlchemy({apiKey:"gnVILV7Ofbk1mASzSAhW2jev-k5Tt8kJ",
		network:Network.MATIC_MAINNET}))


} else if  (chainId == 10){

	contract2 = new ethers.Contract(gameAddressEther, gameAbi.abi, signer)
	setContract(contract2)
	setAlchemy( initializeAlchemy({apiKey:"7txJgzEVy1JAN8B8aJkaFicw3lj4zw8J",
	network:Network.OPT_MAINNET}))

	setNetToks("OETH")
}else if  (chainId == 42161){

	contract2 = new ethers.Contract(gameAddressArb, gameAbi.abi, signer)
	setContract(contract2)
	setAlchemy( initializeAlchemy({apiKey:"z76UjewhlKSKgn_L_yWc8XTRv2StUYgI",
	network:Network.ARB_MAINNET}))

	setNetToks("AETH")
}else if  (chainId == 5){

	setNetToks("GETH")
	contract2 = new ethers.Contract(gameAddressEtherG, gameAbi.abi, signer)
	setContract(contract2)

}

    return provider;
  };
useEffect(() => {
	if (contract){
	setTimeout(async function(){
// @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum)

		const signer = provider.getSigner()
	const accounts = await provider.send("eth_requestAccounts", []);
	console.log(accounts)
		let contract2 = contract
		setFirst(false)
	setAddy(accounts[0])

		
			const t = await (contract2 as ethers.Contract).timer() 
			console.log(t.toNumber())
			let winner = await (contract2 as ethers.Contract).winner();
			let first = winner.substring(0,5)
			let last  = winner.substring(winner.length-3, winner.length)
			const pot = await provider.getBalance(contract2.address)
			console.log(pot)

			let eh = await (contract2 as ethers.Contract).lastTeam()
			console.log(eh)
			let hm = "pepes"
			eh = eh.toNumber() 
			if (eh ==2 ){
				hm = "kings"
			}
			else if (eh == 3 ){
				hm = "bulls"
			}
			else if (eh == 3 ){
				hm = "bears"
			}
			setWTeam(hm)
			if (contract){
			setWinner("Winning: " + first + "..." +last + '; pot: ' + ((parseInt(pot.toString()) / 10 ** 18).toPrecision(6)) .toString() + ' ' + netToks)
			setTimer(t.toNumber())
			getCost(provider)
			getCost5(provider)
			const key = new ethers.Contract(await (contract2 as ethers.Contract).key(), keyAbi, signer)
			
			const j3d = new ethers.Contract(await (contract2 as ethers.Contract).j3d(), keyAbi, signer)
			setToks ('you hodl '+  (parseInt((await j3d.balanceOf(accounts[0])).toString()) / 10 ** 18)  + ' of ' + (parseInt((await j3d.totalSupply())) / 10 ** 18)  + ' tokens, ' + ((((parseInt((await j3d.balanceOf(accounts[0])).toString()) / 10 ** 18) * 100)  /  ((parseInt((await j3d.totalSupply()))) / 10 ** 18) ).toFixed(2)) + '%')
		
			const tokenIds = await key.totalSupply()
			console.log(key)
			
			const fanout = new ethers.Contract(await (contract2 as ethers.Contract).fanout(), fanoutAbi.abi, signer)
			console.log(tokenIds.toNumber()) 
			let mks: any = []
			let ct = 0;
			try  {
				console.log((await fanout.totalClaims()).toString())
				ct= parseInt((await fanout.totalClaims()).toString()) / 10 ** 18 / 10 ** 18
				console.log(ct)
				setClaimed(ct)
						}
						 catch (err){
							console.log(err)
						 }
						 let cnfts = []
						 let onfts = []
	var collNfts =  await				getNftsForCollection (alchemy, key.address);
						var ownedNfts =  await getNftsForOwner (alchemy, accounts[0]);
						cnfts = collNfts.nfts;
						onfts = ownedNfts.ownedNfts;
						 if (collNfts.nfts.length >= 100){
							
							var done = false ;
while (done == false){
	var pageKey = collNfts.pageKey;
	var collNfts =  await				getNftsForCollection (alchemy, key.address, {pageKey});

	for (var aaa of collNfts.nfts){
cnfts.push(aaa)
console.log(cnfts.length)
	}
	if (collNfts.nfts.length < 100){
		done = true;
	}
} 
}if (ownedNfts.ownedNfts.length >= 100){
							
	var done = false ;
while (done == false){
var pageKey = ownedNfts.pageKey;
var ownedNfts =  await getNftsForOwner (alchemy, accounts[0], {pageKey});

for (var bbb of ownedNfts.ownedNfts){
onfts.push(bbb)
console.log(onfts.length)
}
if (ownedNfts.ownedNfts.length < 100){
done = true;
}
}

						 }
				console.log(cnfts[cnfts.length-1])

				console.log(onfts[onfts.length-1])
						 for (var aaa of cnfts){
					for (var bbb of onfts){
						
						if (aaa.tokenId == bbb.tokenId && aaa.contract.address.toLowerCase() == bbb.contract.address.toLowerCase()){
							mks.push(aaa.tokenId)
						}
					}
				}		 
			setMyKeys(mks)
			console.log(mks)
			setNfts ('you hodl '+  mks.length.toString()  + ' of ' + (await key.totalSupply()).toString() + ' keys, ' + ((mks.length  * 100) / await key.totalSupply()).toFixed(2) + '%')
			
		}
	})

}
}, [contract])
  const gameAddressEther = "0x9EFCfaDB72446eD75Aa0399aE09D7b249a803B0d"// = "0xF852ca096C834c46E69FebB131Bce6c687115D65"
const gameAddressEtherG = "0x7FDfcaE6177DAFfa327b9fFbd4bB465b77854cAf"
const gameAddressMatic = "0xFED9A4108118EFaAE629096324498af2C168d944"
const gameAddressArb = "0x0e0168fE7A2DEb2dff824794d4DeF619820f13Ce"// "0x99214692FDb627828b02e9B57b345909689f06aC"
async function connect(){
  const web3Provider = await connectToEthereum();
}
async function mint(){

	const web3Provider = await connectToEthereum();

	const signer = web3Provider.getSigner()
  
	//const contract = new ethers.Contract(gameAddress, abi, web3Provider)
	const key = new ethers.Contract(await (contract as ethers.Contract).j3d(), j3dAbi, signer)
	const accounts = await web3Provider.send("eth_requestAccounts", []);
	const cost = await key.calculatePrice(BigInt(tokz * 10 ** 18))

	try {
		const tx = await (contract as ethers.Contract).ifIwasinla2(BigInt(tokz * 10 ** 18), BigInt(team as number), { value: BigInt(Math.floor(cost)), gasLimit: 390000})

	} catch (err){

	}
}
async function claim(){
	const web3Provider = await connectToEthereum();

	const signer = web3Provider.getSigner()
  
	//const contract = new ethers.Contract(gameAddress, abi, web3Provider)
	
	const fanout = new ethers.Contract(await (contract as ethers.Contract).fanout(), fanoutAbi.abi, signer)
	const tokFanout = new ethers.Contract(await (contract as ethers.Contract).tokFanout(), tokfanoutAbi.abi, signer)
	console.log(fanout)
	try {
		const tx = await tokFanout.claim({gasLimit: 390000})

	} catch (err){
console.log(err)
	}
		try {
			console.log(myKeys)
		const tx = await fanout.claim(myKeys, {gasLimit: BigInt(Math.floor((myKeys.length +1)* 110000))})
		} catch (err){

			console.log(err)
		}
}
async function easy(){

	setMyKeys([])
	const web3Provider = await connectToEthereum();
	try {
// @ts-ignore
await web3Provider.send("wallet_addEthereumChain", [{
	chainId: "0x89",
	rpcUrls: ["https://polygon-rpc.com"],
	chainName: "Matic Mainnet",
	nativeCurrency: {
		name: "MATIC",
		symbol: "MATIC",
		decimals: 18
	},
	blockExplorerUrls: ["https://polygonscan.com/"]
}]);


} catch (err){
	
}
// @ts-ignore
await web3Provider.send("wallet_switchEthereumChain",[{ chainId: '0x89' }])
const x = await connectToEthereum();

	
}

async function medium(){
	setMyKeys([])
	const web3Provider = await connectToEthereum();
	try {
// @ts-ignore
	await window.ethereum.request({
		method: "wallet_addEthereumChain",
		params: [{
			chainId: "0xA4B1",
			rpcUrls: ["https://arb1.arbitrum.io/rpc"],
			chainName: "Arbitrum One",
			nativeCurrency: {
				name: "AETH",
				symbol: "AETH",
				decimals: 18
			},
			blockExplorerUrls: ["https://arbiscan.com/"]
		}]
	});  
} catch (err){
	
}
	 // @ts-ignore
	await window.ethereum.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: '0xA4B1' }],    // chainId must be in HEX with 0x in front
		});
		const x = await connectToEthereum();

}

async function hard(){
	setMyKeys([])
	const web3Provider = await connectToEthereum();
	try {	
// @ts-ignore
await web3Provider.send("wallet_addEthereumChain", [{
	chainId: "0xA",
	rpcUrls: ["https://optimism-mainnet.public.blastapi.io"],
	chainName: "Optimism Mainnet",
	nativeCurrency: {
		name: "OETH",
		symbol: "OETH",
		decimals: 18
	},
	blockExplorerUrls: ["https://optimistic.etherscan.io/"]
}]);


} catch (err){
	
}
// @ts-ignore
await web3Provider.send("wallet_switchEthereumChain",[{ chainId: '0xA' }])
	
const x = await connectToEthereum();

	
}
async function buyKeys(k: number){
  const web3Provider = await connectToEthereum();

  const signer = web3Provider.getSigner()
  //const contract = new ethers.Contract(gameAddress, abi, web3Provider)
let tx = await (contract as ethers.Contract).ifIwasinla(BigInt(k), BigInt(team as number), {value:BigInt(Math.floor( cost as number * 10 ** 18)), gasLimit: k * 980000})
await  tx.wait()

await connectToEthereum();

}	
async function buyKeys2(k: number){
  const web3Provider = await connectToEthereum();

  const signer = web3Provider.getSigner()
  //const contract = new ethers.Contract(gameAddress, abi, web3Provider)
let tx = await (contract as ethers.Contract).ifIwasinla(BigInt(keys), BigInt(team as number), {value: BigInt(Math.ceil(cost100 as number * 10 ** 18)), gasLimit: Math.floor(keys * 380000 / 3)})
await  tx.wait()

await connectToEthereum();

}	

async function getCost(web3Provider: any){
  //const contract = new ethers.Contract(gameAddress, abi, web3Provider)
  let cost = await (contract as ethers.Contract).price();
  cost = (cost / 10 ** 18)
  for (var i = 0; i < 1; i++){
  cost = cost * 1.01;
  }
  setCost(cost)
 
}
async function getCost5(web3Provider: any){
  //const contract = new ethers.Contract(gameAddress, abi, web3Provider)
  let cost = await (contract as ethers.Contract).price();
  cost = (cost / 10 ** 18)
  for (var i = 0; i < 5; i++){
  cost = cost * 1.01;
  }
  
  setCost5(cost)
  if (keys == 5){
	setCost100(cost)
  }
}
async function getCost100(){
	const web3Provider = await connectToEthereum();
    const signer = web3Provider.getSigner()
//const contract = new ethers.Contract(gameAddress, abi, web3Provider)
let cost = await (contract as ethers.Contract).price();
cost = (cost / 10 ** 18)
for (var i = 0; i < keys; i++){
cost = cost * 1.01;
}
console.log(cost)
setCost100(cost)
}
const [myKeys, setMyKeys] = useState<string[]>([]);
const [cost, setCost] = useState<number>();
const [cost5, setCost5] = useState<number>();
const [cost10, setCost10] = useState<number>();
const [cost25, setCost25] = useState<number>();
const [cost100, setCost100] = useState<number>();
    const [balance, setBalance] = useState<number>();
    const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT
    const [isActive, setIsActive] = useState(false); // true when countdown completes or whitelisted
    const [solanaExplorerLink, setSolanaExplorerLink] = useState<string>("");
    const [netToks, setNetToks] = useState<string>("");
    const [itemsAvailable, setItemsAvailable] = useState(0);
    const [itemsRedeemed, setItemsRedeemed] = useState(0);
    const [itemsRemaining, setItemsRemaining] = useState(0);
    const [isSoldOut, setIsSoldOut] = useState(false);
    const [payWithSplToken, setPayWithSplToken] = useState(false);
    const [price, setPrice] = useState(0);
    const [priceLabel, setPriceLabel] = useState<string>("SOL");
    const [whitelistPrice, setWhitelistPrice] = useState(0);
    const [whitelistEnabled, setWhitelistEnabled] = useState(false);
    const [isBurnToken, setIsBurnToken] = useState(false);
    const [whitelistTokenBalance, setWhitelistTokenBalance] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    const [endDate, setEndDate] = useState<Date>();
    const [isPresale, setIsPresale] = useState(false);
    const [isWLOnly, setIsWLOnly] = useState(false);

    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: "",
        severity: undefined,
    });

    const [needTxnSplit, setNeedTxnSplit] = useState(true);
    /*
    const [setupTxn, setSetupTxn] = useState<SetupState>();

    const wallet = useWallet();
    const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();

    const rpcUrl = props.rpcHost;
    const solFeesEstimation = 0.012; // approx of account creation fees

    const anchorWallet = useMemo(() => {
        if (
            !wallet ||
            !wallet.publicKey ||
            !wallet.signAllTransactions ||
            !wallet.signTransaction
        ) {
            return;
        }

        return {
            publicKey: wallet.publicKey,
            signAllTransactions: wallet.signAllTransactions,
            signTransaction: wallet.signTransaction,
        } as anchor.Wallet;
    }, [wallet]);

    const refreshCandyMachineState = useCallback(
        async (commitment: Commitment = 'confirmed') => {
            if (!anchorWallet) {
                return;
            }

            const connection = new Connection(props.rpcHost, commitment);

            if (props.candyMachineId) {
                try {
                    const cndy = await getCandyMachineState(
                        anchorWallet,
                        props.candyMachineId,
                        connection,
                    );

                    setCandyMachine(cndy);
                    setItemsAvailable(cndy.state.itemsAvailable);
                    setItemsRemaining(cndy.state.itemsRemaining);
                    setItemsRedeemed(cndy.state.itemsRedeemed);

                    var divider = 1;
                    if (decimals) {
                        divider = +('1' + new Array(decimals).join('0').slice() + '0');
                    }

                    // detect if using spl-token to BUY KEYS
                    if (cndy.state.tokenMint) {
                        setPayWithSplToken(true);
                        // Customize your SPL-TOKEN Label HERE
                        // TODO: get spl-token metadata name
                        setPriceLabel(splTokenName);
                        setPrice(cndy.state.price.toNumber() / divider);
                        setWhitelistPrice(cndy.state.price.toNumber() / divider);
                    } else {
                        setPrice(cndy.state.price.toNumber() / LAMPORTS_PER_SOL);
                        setWhitelistPrice(cndy.state.price.toNumber() / LAMPORTS_PER_SOL);
                    }


                    // fetch whitelist token balance
                    if (cndy.state.whitelistMintSettings) {
                        setWhitelistEnabled(true);
                        setIsBurnToken(cndy.state.whitelistMintSettings.mode.burnEveryTime);
                        setIsPresale(cndy.state.whitelistMintSettings.presale);
                        setIsWLOnly(!isPresale && cndy.state.whitelistMintSettings.discountPrice === null);

                        if (cndy.state.whitelistMintSettings.discountPrice !== null && cndy.state.whitelistMintSettings.discountPrice !== cndy.state.price) {
                            if (cndy.state.tokenMint) {
                                setWhitelistPrice(cndy.state.whitelistMintSettings.discountPrice?.toNumber() / divider);
                            } else {
                                setWhitelistPrice(cndy.state.whitelistMintSettings.discountPrice?.toNumber() / LAMPORTS_PER_SOL);
                            }
                        }

                        let balance = 0;
                        try {
                            const tokenBalance =
                                await props.connection.getTokenAccountBalance(
                                    (
                                        await getAtaForMint(
                                            cndy.state.whitelistMintSettings.mint,
                                            anchorWallet.publicKey,
                                        )
                                    )[0],
                                );

                            balance = tokenBalance?.value?.uiAmount || 0;
                        } catch (e) {
                            console.error(e);
                            balance = 0;
                        }
                        if (commitment !== "processed") {
                            setWhitelistTokenBalance(balance);
                        }
                        setIsActive(isPresale && !isEnded && balance > 0);

                    } else {
                        setWhitelistEnabled(false);
                    }

                    // end the mint when date is reached
                    if (cndy?.state.endSettings?.endSettingType.date) {
                        setEndDate(toDate(cndy.state.endSettings.number));
                        if (
                            cndy.state.endSettings.number.toNumber() <
                            new Date().getTime() / 1000
                        ) {
                            setIsEnded(true);
                            setIsActive(false);
                        }
                    }
                    // end the mint when amount is reached
                    if (cndy?.state.endSettings?.endSettingType.amount) {
                        let limit = Math.min(
                            cndy.state.endSettings.number.toNumber(),
                            cndy.state.itemsAvailable,
                        );
                        setItemsAvailable(limit);
                        if (cndy.state.itemsRedeemed < limit) {
                            setItemsRemaining(limit - cndy.state.itemsRedeemed);
                        } else {
                            setItemsRemaining(0);
                            cndy.state.isSoldOut = true;
                            setIsEnded(true);
                        }
                    } else {
                        setItemsRemaining(cndy.state.itemsRemaining);
                    }

                    if (cndy.state.isSoldOut) {
                        setIsActive(false);
                    }

                    const [collectionPDA] = await getCollectionPDA(props.candyMachineId);
                    const collectionPDAAccount = await connection.getAccountInfo(
                        collectionPDA,
                    );

                    const txnEstimate =
                        892 +
                        (!!collectionPDAAccount && cndy.state.retainAuthority ? 182 : 0) +
                        (cndy.state.tokenMint ? 66 : 0) +
                        (cndy.state.whitelistMintSettings ? 34 : 0) +
                        (cndy.state.whitelistMintSettings?.mode?.burnEveryTime ? 34 : 0) +
                        (cndy.state.gatekeeper ? 33 : 0) +
                        (cndy.state.gatekeeper?.expireOnUse ? 66 : 0);

                    setNeedTxnSplit(txnEstimate > 1230);
                } catch (e) {
                    if (e instanceof Error) {
                        if (
                            e.message === `Account does not exist ${props.candyMachineId}`
                        ) {
                            setAlertState({
                                open: true,
                                message: `Couldn't fetch candy machine state from candy machine with address: ${props.candyMachineId}, using rpc: ${props.rpcHost}! You probably typed the REACT_APP_CANDY_MACHINE_ID value in wrong in your .env file, or you are using the wrong RPC!`,
                                severity: 'error',
                                hideDuration: null,
                            });
                        } else if (
                            e.message.startsWith('failed to get info about account')
                        ) {
                            setAlertState({
                                open: true,
                                message: `Couldn't fetch candy machine state with rpc: ${props.rpcHost}! This probably means you have an issue with the REACT_APP_SOLANA_RPC_HOST value in your .env file, or you are not using a custom RPC!`,
                                severity: 'error',
                                hideDuration: null,
                            });
                        }
                    } else {
                        setAlertState({
                            open: true,
                            message: `${e}`,
                            severity: 'error',
                            hideDuration: null,
                        });
                    }
                    console.log(e);
                }
            } else {
                setAlertState({
                    open: true,
                    message: `Your REACT_APP_CANDY_MACHINE_ID value in the .env file doesn't look right! Make sure you enter it in as plain base-58 address!`,
                    severity: 'error',
                    hideDuration: null,
                });
            }
        },
        [anchorWallet, props.candyMachineId, props.rpcHost, isEnded, isPresale, props.connection],
    );

    const renderGoLiveDateCounter = ({days, hours, minutes, seconds}: any) => {
        return (
            <div><Card elevation={1}><h1>{days}</h1>Days</Card><Card elevation={1}><h1>{hours}</h1>
                Hours</Card><Card elevation={1}><h1>{minutes}</h1>Mins</Card><Card elevation={1}>
                <h1>{seconds}</h1>Secs</Card></div>
        );
    };
*/
    const renderEndDateCounter = ({days, hours, minutes}: any) => {
        let label = "";
        if (days > 0) {
            label += days + " days "
        }
        if (hours > 0) {
            label += hours + " hours "
        }
        label += (minutes + 1) + " minutes left to BURN KEYS."
        return (
            <div><h3>{label}</h3></div>
        );
    };
/*
    function displaySuccess(mintPublicKey: any, qty: number = 1): void {
        let remaining = itemsRemaining - qty;
        setItemsRemaining(remaining);
        setIsSoldOut(remaining === 0);
        if (isBurnToken && whitelistTokenBalance && whitelistTokenBalance > 0) {
            let balance = whitelistTokenBalance - qty;
            setWhitelistTokenBalance(balance);
            setIsActive(isPresale && !isEnded && balance > 0);
        }
        setSetupTxn(undefined);
        setItemsRedeemed(itemsRedeemed + qty);
        if (!payWithSplToken && balance && balance > 0) {
            setBalance(balance - ((whitelistEnabled ? whitelistPrice : price) * qty) - solFeesEstimation);
        }
        setSolanaExplorerLink(cluster === "devnet" || cluster === "testnet"
            ? ("https://solscan.io/token/" + mintPublicKey + "?cluster=" + cluster)
            : ("https://solscan.io/token/" + mintPublicKey));
        setIsMinting(false);
        throwConfetti();
    };

    function throwConfetti(): void {
        confetti({
            particleCount: 400,
            spread: 70,
            origin: {y: 0.6},
        });
    }

    const onMint = async (
        beforeTransactions: Transaction[] = [],
        afterTransactions: Transaction[] = [],
    ) => {
        try {
            if (wallet.connected && candyMachine?.program && wallet.publicKey) {
                setIsMinting(true);
                let setupMint: SetupState | undefined;
                if (needTxnSplit && setupTxn === undefined) {
                    setAlertState({
                        open: true,
                        message: 'Please validate account setup transaction',
                        severity: 'info',
                    });
                    setupMint = await createAccountsForMint(
                        candyMachine,
                        wallet.publicKey,
                    );
                    let status: any = {err: true};
                    if (setupMint.transaction) {
                        status = await awaitTransactionSignatureConfirmation(
                            setupMint.transaction,
                            props.txTimeout,
                            props.connection,
                            true,
                        );
                    }
                    if (status && !status.err) {
                        setSetupTxn(setupMint);
                        setAlertState({
                            open: true,
                            message:
                                'Setup transaction succeeded! You can now validate mint transaction',
                            severity: 'info',
                        });
                    } else {
                        setAlertState({
                            open: true,
                            message: 'Mint failed! Please try again!',
                            severity: 'error',
                        });
                        return;
                    }
                }

                const setupState = setupMint ?? setupTxn;
                const mint = setupState?.mint ?? anchor.web3.Keypair.generate();
                let mintResult = await mintOneToken(
                    candyMachine,
                    wallet.publicKey,
                    mint,
                    beforeTransactions,
                    afterTransactions,
                    setupState,
                );

                let status: any = {err: true};
                let metadataStatus = null;
                if (mintResult) {
                    status = await awaitTransactionSignatureConfirmation(
                        mintResult.mintTxId,
                        props.txTimeout,
                        props.connection,
                        true,
                    );

                    metadataStatus =
                        await candyMachine.program.provider.connection.getAccountInfo(
                            mintResult.metadataKey,
                            'processed',
                        );
                    console.log('Metadata status: ', !!metadataStatus);
                }

                if (status && !status.err && metadataStatus) {
                    setAlertState({
                        open: true,
                        message: 'Congratulations! Mint succeeded!',
                        severity: 'success',
                    });

                    // update front-end amounts
                    displaySuccess(mint.publicKey);
                    refreshCandyMachineState('processed');
                } else if (status && !status.err) {
                    setAlertState({
                        open: true,
                        message:
                            'Mint likely failed! Anti-bot SOL 0.01 fee potentially charged! Check the explorer to confirm the mint failed and if so, make sure you are eligible to BUY KEYS before trying again.',
                        severity: 'error',
                        hideDuration: 8000,
                    });
                    refreshCandyMachineState();
                } else {
                    setAlertState({
                        open: true,
                        message: 'Mint failed! Please try again!',
                        severity: 'error',
                    });
                    refreshCandyMachineState();
                }
            }
        } catch (error: any) {
            let message = error.msg || 'Minting failed! Please try again!';
            if (!error.msg) {
                if (!error.message) {
                    message = 'Transaction Timeout! Please try again.';
                } else if (error.message.indexOf('0x138')) {
                } else if (error.message.indexOf('0x137')) {
                    message = `SOLD OUT!`;
                } else if (error.message.indexOf('0x135')) {
                    message = `Insufficient funds to BUY KEYS. Please fund your wallet.`;
                }
            } else {
                if (error.code === 311) {
                    message = `SOLD OUT!`;
                } else if (error.code === 312) {
                    message = `Minting period hasn't started yet.`;
                }
            }

            setAlertState({
                open: true,
                message,
                severity: "error",
            });
        } finally {
            setIsMinting(false);
        }
    };

    useEffect(() => {
        (async () => {
            if (anchorWallet) {
                const balance = await props.connection.getBalance(anchorWallet!.publicKey);
                setBalance(balance / LAMPORTS_PER_SOL);
            }
        })();
    }, [anchorWallet, props.connection]);

    useEffect(() => {
        refreshCandyMachineState();
    }, [
        anchorWallet,
        props.candyMachineId,
        props.connection,
        isEnded,
        isPresale,
        refreshCandyMachineState
    ]);
*/
const [keys, setKeys] = useState(5);

const [tokz, setTokz] = useState(100);

function RangeSlider2() {

	const handleChange =  (event: any, newValue: any) => {
		setTokz(parseInt(newValue))
	};
  
	return (
	  <div>
		<Slider
		  value={Math.round(tokz )}
		  onChange={handleChange}
		  min={1000}
		  step={1000}
		  max={100000}
		  style={{backgroundColor: "purple"}}
		  valueLabelDisplay="auto"
		  aria-labelledby="range-slider"
		/>
	  </div>
	);
  }

function RangeSlider() {

	const handleChange =  async (event: any, value: any) => {
			setKeys((value));
			const web3Provider = await connectToEthereum();
			const signer = web3Provider.getSigner()
		//const contract = new ethers.Contract(gameAddress, abi, web3Provider)
		let cost = await (contract as ethers.Contract).price();
		cost = (cost / 10 ** 18)
		for (var i = 0; i < value; i++){
		cost = cost * 1.01;
		}
		console.log(cost)
		setCost100(cost)
	};
  
	return (
	  <div>
		<Slider
		  value={keys}
		  onChange={handleChange}
		  min={1}
		  max={100}
		  style={{backgroundColor: "purple"}}
		  valueLabelDisplay="auto"
		  aria-labelledby="range-slider"
		/>
	  </div>
	);
  }
async function burn(){
    const web3Provider = await connectToEthereum();
    const signer = web3Provider.getSigner()

    //const contract = new ethers.Contract(gameAddress, abi, web3Provider)
console.log(team)
console.log(team)

console.log(team)

console.log(team)

console.log(myKeys[0])
console.log(myKeys[0])
console.log(myKeys[0])
console.log(myKeys[0])
   let tx = await (contract as ethers.Contract).burn((myKeys[myKeys.length-1]) , BigInt(team as number), {gasLimit: 520000})
	await  tx.wait()
	await connectToEthereum();
}
async function concludeRound(){
    const web3Provider = await connectToEthereum();
    const signer = web3Provider.getSigner()

    //const contract = new ethers.Contract(gameAddress, abi, web3Provider)
  let tx =  await (contract as ethers.Contract).concludeRound({gasLimit: 90000})
  await  tx.wait()
	await connectToEthereum();
}
    return (
        <main>
            <MainContainer>
             
                <br/>
                <MintContainer>
                    <DesContainer>
                        <NFT elevation={3}>
                        <WalletContainer>
					
				<Wallet>
                        
						<ConnectButton onClick={easy}>Polygon</ConnectButton>
				</Wallet>
				<Wallet>
                        
						<ConnectButton onClick={medium}>Arbitrum</ConnectButton>
				</Wallet>
				<Wallet>
                        
						<ConnectButton onClick={hard}>Optimism</ConnectButton>
				</Wallet>
                    <Wallet>
                        
                            <ConnectButton onClick={connect}>Connect Wallet</ConnectButton>
                    </Wallet>
                </WalletContainer><Modal /><br/><br/>
                            <div><Price
                                label={winner}/><Image
                                src="cool-cats.gif"
                                alt="NFT to BUY KEYS"/></div>
                            <br/>
				{!isOpen && <div>
                            
                           {timer && timer > new Date().getTime() / 1000 ? (<div>
						takes a few seconds to load keys.. <br />{toks}
 <br/>{nfts}<br/>							
							<CTAButton onClick={claim}>
                            claim pending bizness..!</CTAButton>	<br/>	<br/>						Choose your fate.. {wTeam} win at the moment :D<br/> <br/>
								<button
            
            onClick={async () => {
                setTeam(1)
            }}
        >
            
                     
                        pepe
        </button><button
            
            onClick={async () => {
                setTeam(2)
            }}
        >
            
                     
                        king
        </button><button
            
            onClick={async () => {
                setTeam(3)
            }}
        >
            
                     
                        bull
        </button><button
            
            onClick={async () => {
                setTeam(4)
            }}
        >
            
                     
                        bear
        </button> <br/> <br/> <Countdown
                                date={toDate(new BN(timer ))}
                                onMount={({completed}) => completed && setIsEnded(true)}
                                onComplete={() => {
                                    setIsEnded(true);
                                }}
                                renderer={renderEndDateCounter}
                              />
							<CTAButton disabled={!team} onClick={burn}>
                            Burn a key, become winner!</CTAButton><br/><br/><CTAButton disabled={!team} onClick={mint}>
                            mint 100 tokenz..!</CTAButton> <br /><RangeSlider2 /><CTAButton disabled={!team} onClick={mint}>
                            mint {tokz} tokenz..!</CTAButton> 
                             </div>
                           ) : timer && (
                            <CTAButton onClick={concludeRound}>
                            Winner winner chickum dinners...</CTAButton>
                           )}
                            <br/>{timer && 
                            <MintButtonContainer>

                            <CTAButton 
            disabled={!team}
            
            onClick={async () => {
                buyKeys(1)
            }}
            variant="contained"
        >
            
                     
                        buy 1 key: {cost} {netToks} 
        </CTAButton> <br/>
<RangeSlider /><br/>
		<CTAButton
            disabled={!team}
            
            onClick={async () => {
                buyKeys2(keys)
            }}
            variant="contained"
        >
            
                     
                        buy {keys} keys: {cost100} {netToks} 
        </CTAButton>
        
                            </MintButtonContainer>} 
                            <br/></div>}
                        </NFT>
                    </DesContainer>
                </MintContainer>
            </MainContainer>
            <Snackbar
                open={alertState.open}
                autoHideDuration={6000}
                onClose={() => setAlertState({...alertState, open: false})}
            >
                <Alert
                    onClose={() => setAlertState({...alertState, open: false})}
                    severity={alertState.severity}
                >
                    {alertState.message}
                </Alert>
            </Snackbar>
        </main>
    );
};

export default Home;
