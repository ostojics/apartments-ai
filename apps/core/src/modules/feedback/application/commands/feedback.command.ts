import {Command, CommandProps} from 'src/libs/domain/commands/command.base';

export interface FeedbackCommandProps extends CommandProps {
  content: string;
  feedbackMetadata?: Record<string, unknown>;
}

export class FeedbackCommand extends Command {
  public readonly content: string;
  public readonly feedbackMetadata: Record<string, unknown>;

  constructor(props: FeedbackCommandProps) {
    super(props);
    this.content = props.content;
    this.feedbackMetadata = props.feedbackMetadata ?? {};
  }
}
