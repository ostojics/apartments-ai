import {randomUUID} from 'crypto';
import {CommandMetadata, CommandMetadataProps} from './command.metadata';

export interface CommandProps extends CommandMetadataProps {
  id?: string;
}

export class Command {
  readonly id: string;
  readonly metadata: CommandMetadata;

  constructor(props: CommandProps) {
    this.id = props.id ?? randomUUID();
    this.metadata = new CommandMetadata(props.metadata ?? {});
  }

  toString(): string {
    return `Command { id: ${this.id}, metadata: ${JSON.stringify(this.metadata)} }`;
  }
}
