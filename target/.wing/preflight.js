const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WINGSDK_SYNTH_DIR ?? ".";

function __app(target) {
	switch (target) {
		case "sim":
			return $stdlib.sim.App;
		case "tfaws":
		case "tf-aws":
			return $stdlib.tfaws.App;
		case "tf-gcp":
			return $stdlib.tfgcp.App;
		case "tf-azure":
			return $stdlib.tfazure.App;
		default:
			throw new Error(`Unknown WING_TARGET value: "${process.env.WING_TARGET ?? ""}"`);
	}
}
const $App = __app(process.env.WING_TARGET);

const cloud = require('@winglang/sdk').cloud;
class MyApp extends $App {
constructor() {
  super({ outdir: $outdir, name: "hello" });
  
  const bucket = new cloud.Bucket(this,"cloud.Bucket");
  const queue = new cloud.Queue(this,"cloud.Queue");
  (queue.onMessage(new $stdlib.core.Inflight(this, "$Inflight1", {
    code: $stdlib.core.NodeJsCode.fromFile(require('path').resolve(__dirname, "proc.211d46e8ec3b5ce3e93872fcb29755356fb3566f5016eae5fcd6ec0f670ab580/index.js")),
    bindings: {
      resources: {
        bucket: {
          resource: bucket,
          ops: ["delete","get","list","put"]
        },
      },
      
    }
  })));
}
}
new MyApp().synth();