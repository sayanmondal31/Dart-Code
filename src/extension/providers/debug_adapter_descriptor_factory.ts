import { DebugAdapterDescriptor, DebugAdapterDescriptorFactory, DebugAdapterExecutable, DebugSession } from "vscode";
import { DebuggerType } from "../../shared/enums";

export class DartDebugAdapterDescriptorFactory implements DebugAdapterDescriptorFactory {
	public createDebugAdapterDescriptor(session: DebugSession, executable: DebugAdapterExecutable | undefined): DebugAdapterDescriptor {
		let debuggerScript: string;
		switch (session.configuration.debuggerType) {
			case DebuggerType.Flutter:
				debuggerScript = "flutter_debug_entry";
				break;
			case DebuggerType.FlutterTest:
				debuggerScript = "flutter_test_debug_entry";
				break;
			case DebuggerType.Web:
				debuggerScript = "web_debug_entry";
				break;
			case DebuggerType.WebTest:
				debuggerScript = "web_test_debug_entry"
				break;
			case DebuggerType.Dart:
				debuggerScript = "dart_debug_entry";
				break;
			case DebuggerType.PubTest:
				debuggerScript = "dart_test_debug_entry";
				break;
			default:
				throw new Error("Unknown debugger type");
		}

		return new DebugAdapterExecutable("node", [`./out/src/debug/${debuggerScript}.js`]);
	}
}
