const contracts = {
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        YourContract: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "greetingSetter",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "newGreeting",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "premium",
                  type: "bool",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "GreetingChange",
              type: "event",
            },
            {
              inputs: [],
              name: "greeting",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "premium",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_newGreeting",
                  type: "string",
                },
              ],
              name: "setGreeting",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "totalCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "userGreetingCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        ShipStream: {
          address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "streamCreator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "duration",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "frequency",
                  type: "uint256",
                },
              ],
              name: "StreamCreated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "streamCreator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "stream",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "upload",
                  type: "string",
                },
              ],
              name: "StringUploaded",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_index",
                  type: "uint256",
                },
              ],
              name: "closeStream",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "duration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "frequency",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
              ],
              name: "createStream",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "differenct",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "isCloseable",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "stream",
                  type: "uint256",
                },
              ],
              name: "lastUploadOf",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "numStreams",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_index",
                  type: "uint256",
                },
              ],
              name: "ok",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "stream",
                  type: "uint256",
                },
              ],
              name: "streamOf",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "duration",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "frequency",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startBalance",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "currentBalance",
                      type: "uint256",
                    },
                    {
                      internalType: "string[]",
                      name: "uploads",
                      type: "string[]",
                    },
                    {
                      internalType: "uint256",
                      name: "streamed",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "totalStreams",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ShipStream.Stream",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "stream",
                  type: "uint256",
                },
              ],
              name: "streamedOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "streams",
              outputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "duration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "frequency",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "startTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "endTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "startBalance",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "currentBalance",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "streamed",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "totalStreams",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "streamsOf",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "duration",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "frequency",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startBalance",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "currentBalance",
                      type: "uint256",
                    },
                    {
                      internalType: "string[]",
                      name: "uploads",
                      type: "string[]",
                    },
                    {
                      internalType: "uint256",
                      name: "streamed",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "totalStreams",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ShipStream.Stream[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalStreams",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "stream",
                  type: "uint256",
                },
              ],
              name: "totalStreamsOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_upload",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_index",
                  type: "uint256",
                },
              ],
              name: "uploadString",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "stream",
                  type: "uint256",
                },
              ],
              name: "uploadsOf",
              outputs: [
                {
                  internalType: "string[]",
                  name: "",
                  type: "string[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
  11155111: [
    {
      name: "sepolia",
      chainId: "11155111",
      contracts: {
        ShipStream: {
          address: "0x94491b52127B291b29C6c7268246C64BfCF27CD8",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "streamCreator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "duration",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "frequency",
                  type: "uint256",
                },
              ],
              name: "StreamCreated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "streamCreator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "stream",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "upload",
                  type: "string",
                },
              ],
              name: "StringUploaded",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_index",
                  type: "uint256",
                },
              ],
              name: "closeStream",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "duration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "frequency",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
              ],
              name: "createStream",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "isCloseable",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "stream",
                  type: "uint256",
                },
              ],
              name: "lastUploadOf",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "numStreams",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_index",
                  type: "uint256",
                },
              ],
              name: "ok",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "stream",
                  type: "uint256",
                },
              ],
              name: "streamOf",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "duration",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "frequency",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startBalance",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "currentBalance",
                      type: "uint256",
                    },
                    {
                      internalType: "string[]",
                      name: "uploads",
                      type: "string[]",
                    },
                    {
                      internalType: "uint256",
                      name: "streamed",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "totalStreams",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ShipStream.Stream",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "stream",
                  type: "uint256",
                },
              ],
              name: "streamedOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "streams",
              outputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "duration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "frequency",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "startTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "endTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "startBalance",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "currentBalance",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "streamed",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "totalStreams",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "streamsOf",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "duration",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "frequency",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startBalance",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "currentBalance",
                      type: "uint256",
                    },
                    {
                      internalType: "string[]",
                      name: "uploads",
                      type: "string[]",
                    },
                    {
                      internalType: "uint256",
                      name: "streamed",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "totalStreams",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ShipStream.Stream[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalStreams",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "stream",
                  type: "uint256",
                },
              ],
              name: "totalStreamsOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_upload",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_index",
                  type: "uint256",
                },
              ],
              name: "uploadString",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "stream",
                  type: "uint256",
                },
              ],
              name: "uploadsOf",
              outputs: [
                {
                  internalType: "string[]",
                  name: "",
                  type: "string[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        YourContract: {
          address: "0xfEca367A5D8e6611D68188757c43618c71f44caE",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "greetingSetter",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "newGreeting",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "premium",
                  type: "bool",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "GreetingChange",
              type: "event",
            },
            {
              inputs: [],
              name: "greeting",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "premium",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_newGreeting",
                  type: "string",
                },
              ],
              name: "setGreeting",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "totalCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "userGreetingCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
