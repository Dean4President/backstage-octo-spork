import { Group, User } from '@backstage/plugin-cost-insights';

export type ManagedFileKind = 'ManagedFile';
export type ManagedFileType = 'NTFS' | 'S3';

export type ManagedFile = {
    kind: ManagedFileKind;
    type: ManagedFileType;
    path: string;
    owner: Group | User;
}