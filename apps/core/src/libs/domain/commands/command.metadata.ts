export interface CommandMetadataProps {
  metadata?: Record<string, any>;
}

export class CommandMetadata {
  public readonly timestamp: string;
  public readonly metadata: Record<string, any>;

  constructor(props: CommandMetadataProps) {
    this.timestamp = new Date().toISOString();
    this.metadata = props.metadata ?? {};
  }
}
