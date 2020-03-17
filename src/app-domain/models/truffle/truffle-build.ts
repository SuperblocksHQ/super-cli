export interface ITruffleBuild {
    contractName:      string;
    abi:               IABI[];
    metadata:          string;
    bytecode:          string;
    deployedBytecode:  string;
    sourceMap:         string;
    deployedSourceMap: string;
    source:            string;
    sourcePath:        string;
    ast:               IAST;
    legacyAST:         IAST;
    compiler:          ICompiler;
    networks:          INetworks;
    schemaVersion:     string;
    updatedAt:         Date;
    devdoc:            IDoc;
    userdoc:           IDoc;
}

export interface IABI {
    constant:        boolean;
    inputs:          IPut[];
    name:            string;
    outputs:         IPut[];
    payable:         boolean;
    stateMutability: string;
    type:            string;
}

export interface IPut {
    internalType: InternalType;
    name:         string;
    type:         InternalType;
}

export enum InternalType {
    Uint256 = 'uint256',
}

export interface IAST {
    absolutePath:    string;
    exportedSymbols: IExportedSymbols;
    id:              number;
    nodeType:        string;
    nodes:           IASTNode[];
    src:             string;
}

export interface IExportedSymbols {
    SimpleStorage: number[];
}

export interface IASTNode {
    id:                       number;
    literals?:                string[];
    nodeType:                 string;
    src:                      string;
    baseContracts?:           any[];
    contractDependencies?:    any[];
    contractKind?:            string;
    documentation?:           null;
    fullyImplemented?:        boolean;
    linearizedBaseContracts?: number[];
    name?:                    string;
    nodes?:                   INode[];
    scope?:                   number;
}

export interface INode {
    constant?:         boolean;
    id:                number;
    name:              string;
    nodeType:          string;
    scope:             number;
    src:               string;
    stateVariable?:    boolean;
    storageLocation?:  string;
    typeDescriptions?: ITypeDescriptions;
    typeName?:         ITypeName;
    value?:            null;
    visibility:        string;
    body?:             IBody;
    documentation?:    null;
    implemented?:      boolean;
    kind?:             string;
    modifiers?:        any[];
    parameters?:       IBody;
    returnParameters?: IBody;
    stateMutability?:  string;
    superFunction?:    null;
}

export interface IBody {
    id:          number;
    nodeType:    NodeType;
    src:         string;
    statements?: IStatement[];
    parameters?: IParameter[];
}

export enum NodeType {
    Block = 'Block',
    ParameterList = 'ParameterList',
}

export interface IParameter {
    constant:         boolean;
    id:               number;
    name:             string;
    nodeType:         string;
    scope:            number;
    src:              string;
    stateVariable:    boolean;
    storageLocation:  string;
    typeDescriptions: ITypeDescriptions;
    typeName:         ITypeName;
    value:            null;
    visibility:       string;
}

export interface ITypeDescriptions {
    typeIdentifier: TypeIdentifier;
    typeString:     InternalType;
}

export enum TypeIdentifier {
    TUint256 = 't_uint256',
}

export interface ITypeName {
    id:               number;
    name:             string;
    nodeType:         string;
    src:              string;
    typeDescriptions: ITypeDescriptions;
}

export interface IStatement {
    expression:                IExpression;
    id:                        number;
    nodeType:                  string;
    src:                       string;
    functionReturnParameters?: number;
}

export interface IExpression {
    argumentTypes:           null;
    id:                      number;
    isConstant?:             boolean;
    isLValue?:               boolean;
    isPure?:                 boolean;
    lValueRequested?:        boolean;
    leftHandSide?:           IHandSide;
    nodeType:                string;
    operator?:               string;
    rightHandSide?:          IHandSide;
    src:                     string;
    typeDescriptions:        ITypeDescriptions;
    name?:                   string;
    overloadedDeclarations?: any[];
    referencedDeclaration?:  number;
}

export interface IHandSide {
    argumentTypes:          null;
    id:                     number;
    name:                   string;
    nodeType:               string;
    overloadedDeclarations: any[];
    referencedDeclaration:  number;
    src:                    string;
    typeDescriptions:       ITypeDescriptions;
}

export interface ICompiler {
    name:    string;
    version: string;
}

export interface IDoc {
    methods: IMethods;
}

// tslint:disable-next-line:no-empty-interface
interface IMethods { }

export interface INetworks {
    '0'?: INetwork;
    '1'?: INetwork;
    '2'?: INetwork;
    '3'?: INetwork;
    '4'?: INetwork;
    '5'?: INetwork;
}

export interface INetwork {
    events:          IMethods;
    links:           IMethods;
    address:         string;
    transactionHash: string;
}
